from django.db.models import Count
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.applications.models import OrderModels


class OrderMeStaticView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        analytics = (
            OrderModels.objects.filter(manager=request.user)
            .values("status")
            .annotate(count=Count("id"))
        )
        return Response(analytics)


class OrdersAnalyticsView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        total_orders = OrderModels.objects.count()
        status = (OrderModels.objects.values("status").annotate(count=Count("id")))

        return Response(
            {
                "total_orders": total_orders,
                "status": status
            })
