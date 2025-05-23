from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from apps.all_users_info.users.permissions import IsManager
from apps.all_users_info.users.serializers import UserSerializer

from core.dataclasses.user_dataclass import User
from core.permissions.isSuper_permissions import IsSuperUser

UserModel: User = get_user_model()


class UsersList(ListAPIView):
    """
    get:List all users,
    """
    permission_classes = (IsManager,)
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()


class AdminCreateManagerView(CreateAPIView):
    """
        post:admin create manager
    """
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)

    def perform_create(self, serializer):
        serializer.save(is_staff=True, is_superuser=False)


class UserRetrieveView(RetrieveDestroyAPIView):
    """
        get: Retrieve a user by id
    """

    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = (IsSuperUser,)


class CurrentUserView(RetrieveAPIView):
    """
        get: Retrieve a current authenticated user
    """

    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
