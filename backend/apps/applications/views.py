from django.db import transaction
from django.db.models import Prefetch
from django.utils import timezone
from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.generics import CreateAPIView, GenericAPIView, RetrieveUpdateAPIView, get_object_or_404
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
            queryset=CommentModels.objects.select_related('manager__profile').exclude(manager__isnull=True),
        )
    )

    def patch(self, request, *args, **kwargs):
        order = self.get_object()
        return super().patch(request, *args, **kwargs)


class CommentListView(GenericAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsManager,)

    def get(self, *args, **kwargs):
        order_id = kwargs.get('pk')
        order = get_object_or_404(OrderModels, pk=order_id)

        comments = CommentModels.objects.filter(order=order).order_by('created_at')
        serializer = self.serializer_class(comments, many=True)
        return Response(serializer.data)


class CommentCreateView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsManager,)

    def post(self, request, *args, **kwargs):
        order_id = kwargs.get('pk')
        order = get_object_or_404(OrderModels, pk=order_id)

        if order.manager is not None and order.manager != request.user:
            return Response({'error': 'Only manager can create comments'}, 403)

        comment_data = request.data.get('comment')
        if not comment_data:
            return Response({'error': ' comment required'}, 400)
        with transaction.atomic():
            order = OrderModels.objects.select_for_update().get(pk=order_id)

            if order.manager is None:
                order.manager = request.user

            if order.status in [None, 'New']:
                order.status = 'InWork'
            order.save()

            comment = CommentModels.objects.create(
                order=order,
                comment=comment_data,
                manager=request.user,
                created_at=timezone.now(),
            )
        serializer = self.serializer_class(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
