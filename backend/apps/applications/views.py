from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from apps.all_users_info.users.permissions import IsManager
from apps.applications.filters import ApplicateFilter
from apps.applications.models import OrderModels
from apps.applications.serializers import ApplicationSerializer

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
            queryset = queryset.order_by(order_by) if order_by.startswith('_') else queryset.order_by(order_by)
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

    def post(self, request, *args, **kwargs):
        order_id = kwargs.get('pk')
        try:
            order = OrderModels.objects.get(id=order_id)
            print(order.id)
        except OrderModels.DoesNotExist:
            return Response({'message': 'Order not found-------------'}, status=status.HTTP_404_NOT_FOUND)

        if order.manager is None:
            order.manager = request.user
            order.save(update_fields=['manager'])
            return Response({'message': 'Application has been accepted'}, status=status.HTTP_200_OK)

        return Response({'message': 'Application is already being processed'}, status=status.HTTP_400_BAD_REQUEST)

    # def take_order(self, request, *args, **kwargs):
    #     """
    #     Метод для обробки заявки
    #     """
    #     order_id = kwargs.get('pk')  # Використовуємо pk з URL
    #     try:
    #         order = OrderModels.objects.get(id=order_id)
    #         print(order_id)
    #     except OrderModels.DoesNotExist:
    #
    #         return Response({'message': 'Order not found!!!!!!!!!!!!!!!!!!'}, status=status.HTTP_404_NOT_FOUND)
    #
    #
    #     if order.manager is None:
    #         order.manager = request.user
    #         order.save(update_fields=['manager'])
    #         return Response({'message': 'Application has been accepted'}, status=status.HTTP_200_OK)
    #
    #     return Response({'message': 'Application is already being processed'}, status=status.HTTP_400_BAD_REQUEST)


class ApplicationRetrieveUpdateView(RetrieveUpdateAPIView):
    """
        get:Retrieve a single application
        put:Update a single application
    """
    serializer_class = ApplicationSerializer
    queryset = OrderModels.objects.all()
    permission_classes = (IsManager,)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
