from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from apps.all_users_info.users.models import UserModel
from apps.all_users_info.users.permissions import IsSuperUser
from apps.all_users_info.users.serializers import UserSerializer


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (AllowAny,)


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (AllowAny,)
