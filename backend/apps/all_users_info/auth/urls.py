from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.all_users_info.auth.views import (
    ActivateUserView,
    RecoveryPasswordRequestView,
    RecoveryPasswordView,
    SetPasswordView,
)

urlpatterns = [

    path('', TokenObtainPairView.as_view(), name='auth_login'),
    path('/refresh', TokenRefreshView.as_view(), name='auth_refresh'),
    path('/activate/<str:token>', ActivateUserView.as_view(), name='auth_activate'),
    path('/set-password/<str:token>', SetPasswordView.as_view(), name='auth_set-password'),
    path("/recovery", RecoveryPasswordRequestView.as_view(), name='auth_recovery_password_request'),
    path("/recovery/<str:token>", RecoveryPasswordView.as_view(), name='auth_recovery_password'),

]
