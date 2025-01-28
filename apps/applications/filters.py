from django_filters import rest_framework as filters

from apps.applications.models import OrderModels


class ApplicateFilter(filters.FilterSet):
    order = filters.OrderingFilter(
        fields=(
            ('name', 'name'),
            ('surname', 'surname'),
            ('email', 'email'),
            ('phone', 'phone'),
            ('age', 'age'),
            ('course', 'course'),
            ('course_type', 'course_type'),
            ('course_format', 'course_format'),
            ('status', 'status'),
            ('sum', 'sum'),
            ('alreadyPaid', 'alreadyPaid'),
            ('created_at', 'created_at´'),
        )
    )

    class Meta:
        model = OrderModels
        fields = ['order']
