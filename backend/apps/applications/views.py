from django.utils import timezone

from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from apps.all_users_info.users.permissions import IsManager
from apps.applications.filters import ApplicateFilter
from apps.applications.models import CommentModels, OrderModels
from apps.applications.serializers import ApplicationSerializer, CommentSerializer
from apps.groups.models import GroupModel

from core.pagination import PagePagination


class ApplicationListView(GenericAPIView):
    """
        get:info all applications
    """
    serializer_class = ApplicationSerializer
    queryset = OrderModels.objects.all()
    filterset_class = ApplicateFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    pagination_class = PagePagination
    permission_classes = (AllowAny,)

    def get_queryset(self):
        queryset = self.queryset
        order_by = self.request.query_params.get('order', '')
        if order_by:
            return self.queryset.order_by(order_by)
        return queryset

    def get(self, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)


class ApplicationRetrieveUpdateView(RetrieveUpdateAPIView):
    """
        get:Retrieve a single application
        put:Update a single application
        patch:partial update a single application
    """
    serializer_class = ApplicationSerializer
    queryset = OrderModels.objects.all()
    permission_classes = (IsManager,)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        order = self.get_object()
        group_id = request.data.get('group_id')

        if group_id:
            group = get_object_or_404(GroupModel, pk=group_id)
            order.group = group
            order.save(update_fields=['group'])
            serializer = self.get_serializer(order)
            return Response(self.get_serializer(order).data, status=status.HTTP_200_OK)
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
        try:
            order = OrderModels.objects.get(id=order_id)
        except OrderModels.DoesNotExist:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        if order.manager is None and order.status in [None, 'New']:
            order.manager = request.user
            order.status = 'InWork'
            order.save()

        if order.status in ['InWork', 'New']:
            comment_data = request.data.get('comment')
            if not comment_data:
                return Response({'message': 'Comment is required'}, status=status.HTTP_400_BAD_REQUEST)

            comment = CommentModels.objects.create(
                order=order,
                text=comment_data,
                author=request.user,
                created_at=timezone.now(),
            )

            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'message': f'Cannot process application with status {order.status}'},
                        status=status.HTTP_400_BAD_REQUEST)
