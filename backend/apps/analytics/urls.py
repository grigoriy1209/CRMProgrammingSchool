from django.urls import path

from apps.analytics.views import OrderMeStaticView, OrdersAnalyticsView

urlpatterns = [
    path('', OrderMeStaticView.as_view(), name='order-static'),
    path('/stats', OrdersAnalyticsView.as_view(), name='order-all--analytics'),
]
