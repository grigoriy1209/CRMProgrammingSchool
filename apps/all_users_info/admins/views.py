from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.all_users_info.users.choices import RoleType
from apps.all_users_info.users.serializers import UserSerializer

from core.dataclasses.user_dataclass import User
from core.permissions.isSuper_permissions import IsSuperUser

UserModel: User = get_user_model()


class UserBanView(GenericAPIView):
    permission_classes = (IsSuperUser,)
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return super().get_queryset().exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_active:
            user.is_active = False
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserUnBanView(GenericAPIView):
    permission_classes = (IsSuperUser,)
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return super().get_queryset().exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserToManagerView(GenericAPIView):
    permission_classes = (IsSuperUser,)
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return super().get_queryset().exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()

        if not user.is_staff:
            user.is_staff = True

        if not user.role_type == RoleType.OWNER:
            user.role_type = RoleType.MANAGER

            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ManagerToUserView(GenericAPIView):
    permission_classes = (IsSuperUser,)
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return super().get_queryset().exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()

        if user.is_staff:
            user.is_staff = False

        if user.role_type == RoleType.MANAGER:
            user.role_type = RoleType.OWNER

            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)