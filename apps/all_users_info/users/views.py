from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from django_filters.rest_framework import DjangoFilterBackend

from apps.all_users_info.users.serializers import UserSerializer

from core.dataclasses.user_dataclass import User

UserModel: User = get_user_model()


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (AllowAny,)


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (AllowAny,)
    filter_backends = [DjangoFilterBackend, ]
    filter_fields = ['id', ]
