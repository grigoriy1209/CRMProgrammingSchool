from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, NotFound
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.all_users_info.auth.serializers import EmailSerializer, UserModel, PasswordSerializer
from apps.all_users_info.users.permissions import IsManager
from apps.all_users_info.users.serializers import UserSerializer
from core.services.email_service import EmailService
from core.services.jwt_service import JWTService, ActionToken, RecoverToken


class ActivateUserView(GenericAPIView):
    """
        patch: activate user
    """
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        pass

    def patch(self, *args, **kwargs):
        token = kwargs['token']
        try:
            user = JWTService.verify_token(token, ActionToken)
            user.is_active = True
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AuthenticationFailed:
            return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


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

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = kwargs.get('token')
        try:
            user = JWTService.verify_token(token, RecoverToken)
            user.set_password(serializer.validate_data['password'])
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AuthenticationFailed:
            return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
