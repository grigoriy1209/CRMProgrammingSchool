from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, NotFound
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.all_users_info.auth.serializers import EmailSerializer, PasswordSerializer
from apps.all_users_info.users.permissions import IsManager
from apps.all_users_info.users.serializers import UserSerializer

from core.dataclasses.user_dataclass import User
from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken

UserModel: User = get_user_model()


class ActivateUserView(GenericAPIView):
    """
        patch: activate user
    """
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def patch(self, *args, **kwargs):
        token = kwargs['token']
        try:
            user = JWTService.validate_token(token, ActivateToken)
            user.is_active = True
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AuthenticationFailed:
            return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class SetPasswordView(GenericAPIView):
    """
        patch: set user password
    """
    permission_classes = (AllowAny,)
    serializer_class = PasswordSerializer

    def patch(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        password = request.data.get('password')

        if not user_id or not password:
            return Response({'detail': 'Missing mandatory fields'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserModel.objects.get(pk=user_id, is_active=True)
        except UserModel.DoesNotExist:
            return Response({'detail': 'User not found or not active'}, 404)
        user.set_password(password)
        user.save()
        return Response({'detail': 'Password updated successfully'}, status=status.HTTP_200_OK)


class RecoveryPasswordRequestView(GenericAPIView):
    """
        post: Request for password recovery.
    """
    permission_classes = (IsManager,)
    serializer_class = EmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = get_object_or_404(UserModel, **serializer.data)
            EmailService.recovery_password(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except NotFound:
            return Response({"detail": "No user with this email was found."}, status=status.HTTP_404_NOT_FOUND)


class RecoveryPasswordView(GenericAPIView):
    """
        post: Resetting the password.
    """
    permission_classes = (IsManager,)
    serializer_class = PasswordSerializer

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        token = kwargs['token']
        try:
            user = JWTService.validate_token(token, RecoveryToken)
            user.set_password(serializer.data['password'])
            user.save()
            return Response({"detail": "Password has been successfully changed"}, status=status.HTTP_200_OK)
        except AuthenticationFailed:
            return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
