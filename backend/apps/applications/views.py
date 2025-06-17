from django.db import transaction
from django.db.models import Prefetch
from django.utils import timezone
from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema

from apps.all_users_info.users.permissions import IsManager
from apps.applications.filter_utils import get_filter_orders
from apps.applications.filters import ApplicateFilter
from apps.applications.models import CommentModels, OrderModels
from apps.applications.serializers import ApplicationSerializer, CommentSerializer

from core.pagination import PagePagination
from core.services.excel_service import ExcelService


class ApplicationListView(GenericAPIView):
    """
        get:info all applications
    """
    serializer_class = ApplicationSerializer
    queryset = OrderModels.objects.all()
    filterset_class = ApplicateFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    pagination_class = PagePagination
    permission_classes = (IsManager,)

    def get_queryset(self):
        queryset = super().get_queryset()
        order_by = self.request.query_params.get('order', '')
        if order_by:
            return self.queryset.order_by(order_by)
        return queryset

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ExportExcelView(APIView):
    permission_classes = (IsManager,)

    def post(self, request, *args, **kwargs):
        queryset = get_filter_orders(request)

        ids = request.data.get('ids', [])
        if ids:
            queryset = queryset.filter(id__in=ids)
        if not queryset.exists():
            return Response({'error': 'No orders found matching the filters'}, 404)

        return ExcelService.generate_excel_file(queryset)


@method_decorator(name='get', decorator=swagger_auto_schema(security=[]))
class ApplicationRetrieveUpdateView(RetrieveUpdateAPIView):
    """
        get:Retrieve a single application
        put:Update a single application
        patch:Partial update a single application
    """
    serializer_class = ApplicationSerializer
    permission_classes = (IsManager,)
    queryset = OrderModels.objects.prefetch_related(
        Prefetch(
            'comments',
            queryset=CommentModels.objects.select_related('author__profile').exclude(author__isnull=True),
        )
    )

    def patch(self, request, *args, **kwargs):
        order = self.get_object()
        return super().patch(request, *args, **kwargs)


class AddCommentView(GenericAPIView):
    """
    post: Add a comment to the application and update status and manager if necessary.
    """
    serializer_class = CommentSerializer
    queryset = CommentModels.objects.all()
    permission_classes = (IsManager,)

    def post(self, request, *args, **kwargs):
        order_id = kwargs.get('pk')
        order = get_object_or_404(OrderModels, id=order_id)

        if order.manager is not None and order.manager != request.user:
            return Response({'message': "You can only comment on orders that are unassigned or assigned to you"},
                            status=status.HTTP_403_FORBIDDEN)

        comment_data = request.data.get('comment')
        if not comment_data:
            return Response({'message': "Comment required"}, status=status.HTTP_400_BAD_REQUEST, )

        with transaction.atomic():
            order = OrderModels.objects.select_for_update().get(id=order_id)

            if order.manager is None:
                order.manager = request.user

            if order.status in [None, 'New']:
                order.status = 'InWork'
            order.save()

            comment = CommentModels.objects.create(
                order=order,
                text=comment_data,
                author=request.user,
                created_at=timezone.now(),
            )

        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
