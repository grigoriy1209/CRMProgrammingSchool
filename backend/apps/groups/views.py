from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.groups.models import GroupModel
from apps.groups.serializers import GroupSerializer


class GroupListCreateAPIView(GenericAPIView):
    queryset = GroupModel.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        groups = self.get_queryset()
        serializer = self.get_serializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


