from django.urls import path

from apps.all_users_info.users.views import UserCreateView, UserRetrieveUpdateDestroyView

urlpatterns = [
    path('', UserCreateView.as_view(), name='user_create'),
    path('/<int:pk>', UserRetrieveUpdateDestroyView.as_view(), name='user_retrieve_update_delete'),
]
