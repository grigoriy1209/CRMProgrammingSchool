from django.urls import path

from apps.groups.views import GroupListCreateAPIView

urlpatterns = [
    path('', GroupListCreateAPIView.as_view(), name='group-list_create'),
]
