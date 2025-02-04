from django.urls import path

from apps.all_users_info.users.views import AdminCreateManagerView, CurrentUserView, UserRetrieveView

urlpatterns = [

    path('/<int:pk>', UserRetrieveView.as_view(), name='user_retrieve'),
    path('/create-manager', AdminCreateManagerView.as_view(), name='admin-create-manager'),
    path('/me', CurrentUserView.as_view(), name='current_user'),

]
