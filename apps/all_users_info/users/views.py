from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from apps.all_users_info.users.serializers import UserSerializer

from core.dataclasses.user_dataclass import User
from core.permissions.isSuper_permissions import IsSuperUser
from core.services.email_service import EmailService

UserModel: User = get_user_model()


class UserCreateView(ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)


class TestEmail(GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, *args, **kwargs):
        EmailService.send_test()
        return Response('Email sent successfully', status=status.HTTP_200_OK)
