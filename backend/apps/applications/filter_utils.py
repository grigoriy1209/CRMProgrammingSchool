from apps.applications.filters import ApplicateFilter
from apps.applications.models import OrderModels


def get_filter_orders(request):
    bq = OrderModels.objects.all()
    filter_data = request.data if request.method == 'GET' else request.query_params

    order_filter = ApplicateFilter(data=filter_data, queryset=bq)

    if order_filter.is_valid():
        return order_filter.qs

    return bq
