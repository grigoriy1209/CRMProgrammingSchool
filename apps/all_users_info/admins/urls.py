
from django.urls import path

from apps.all_users_info.admins.views import UserBanView, UserUnBanView

urlpatterns = [
     path('/<int:pk>/ban', UserBanView.as_view(), name='user_ban'),
     path('/<int:pk>/unban', UserUnBanView.as_view(), name='user_unban'),
     # path('/<int:pk>/to_manage', UserToManagerView.as_view(), name='user_to_manager'),
     # path('/<int:pk>/to_owner', ManagerToUserView.as_view(), name='manager_to_owner'),
]