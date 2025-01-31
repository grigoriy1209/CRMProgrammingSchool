from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from apps.applications.filters import ApplicateFilter
from apps.applications.models import OrderModels
from apps.applications.serializers import ApplicationSerializer

from core.pagination import PagePagination


class ApplicationListCreateView(GenericAPIView):
    """
        get:info all applications
        post:create order
    """
    serializer_class = ApplicationSerializer
    queryset = OrderModels.objects.all()
    filterset_class = ApplicateFilter
    pagination_class = PagePagination
    permission_classes = (AllowAny,)

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
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicationSerializer
    queryset = OrderModels.objects.all()
    permission_classes = (AllowAny,)
