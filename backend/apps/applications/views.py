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
    filter_backends = (DjangoFilterBackend,)
    pagination_class = PagePagination
    permission_classes = (AllowAny,)

    def get_queryset(self):
        queryset = self.queryset
        order_by = self.request.query_params.get('order', '')
        if order_by:
            if order_by.startswith('_'):
                queryset = queryset.order_by(order_by)
            else:
                queryset = queryset.order_by(order_by)
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
    """
    serializer_class = ApplicationSerializer
    queryset = OrderModels.objects.all()
    permission_classes = (IsManager,)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
