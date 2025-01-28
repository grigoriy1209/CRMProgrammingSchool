from django.urls import path

from .views import ApplicationListCreateView, ApplicationRetrieveUpdateDestroyView

urlpatterns = [
    path('', ApplicationListCreateView.as_view(), name='applications_list_create'),

    path('/<int:pk>', ApplicationRetrieveUpdateDestroyView.as_view(), name='application_retrieve_update_delete'),
]
