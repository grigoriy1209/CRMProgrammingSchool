
from django.urls import path

from apps.all_users_info.admins.views import UserBanView, UserUnBanView

urlpatterns = [
     path('/<int:pk>/ban', UserBanView.as_view(), name='user_ban'),
     path('/<int:pk>/unban', UserUnBanView.as_view(), name='user_unban'),
]