from django.urls import path

from .views import ApplicationListView, ApplicationRetrieveUpdateView, TakeManagerView

urlpatterns = [
    path('', ApplicationListView.as_view(), name='applications_list'),

    path('/<int:pk>', ApplicationRetrieveUpdateView.as_view(), name='application_retrieve_update'),
    path('/<int:pk>/take_order', TakeManagerView.as_view(), name='application_take_order'),
]
