from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.all_users_info.users.serializers import UserSerializer

from core.dataclasses.user_dataclass import User
from core.permissions.isSuper_permissions import IsSuperUser
from core.services.email_service import EmailService

UserModel: User = get_user_model()


class UserCreateView(CreateAPIView):
    """
        post:create user
    """
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
        put:update user
        patch:partial update user
        delete:delete user
   """
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)


class TestEmail(GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, *args, **kwargs):
        EmailService.send_test()
        return Response('Email sent successfully', status=status.HTTP_200_OK)
