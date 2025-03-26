from django_filters import rest_framework as filters

from apps.applications.choices.course_choices import Course, CourseFormat, CourseType
from apps.applications.choices.status_type import StatusType
from apps.applications.models import OrderModels


class ApplicateFilter(filters.FilterSet):
    id_in = filters.BaseInFilter(field_name='id', lookup_expr='in')
    id_lt = filters.NumberFilter(field_name='id', lookup_expr='lt')
    id_gt = filters.NumberFilter(field_name='id', lookup_expr='gt')
    id_range = filters.RangeFilter(field_name='id')

    age_lt = filters.NumberFilter(field_name='age', lookup_expr='lt')
    age_gt = filters.NumberFilter(field_name='age', lookup_expr='gt')
    age_in = filters.BaseInFilter(field_name='age', lookup_expr='in')
    age_range = filters.RangeFilter(field_name='age')

    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    surname = filters.CharFilter(field_name="surname", lookup_expr="icontains")
    email = filters.CharFilter(field_name="email", lookup_expr="icontains")
    phone = filters.CharFilter(field_name="phone", lookup_expr="icontains")

    course = filters.ChoiceFilter("course", choices=Course.choices)
    course_type = filters.ChoiceFilter(field_name="course_type", choices=CourseType.choices)
    course_format = filters.ChoiceFilter(field_name="course_format", choices=CourseFormat.choices)

    status = filters.ChoiceFilter(field_name="status",choices=StatusType.choices)

    sum_min = filters.NumberFilter(field_name="sum", lookup_expr="gte")
    sum_max = filters.NumberFilter(field_name="sum", lookup_expr="lte")
    already_paid_min = filters.NumberFilter(field_name="alreadyPaid", lookup_expr="gte")
    already_paid_max = filters.NumberFilter(field_name="alreadyPaid", lookup_expr="lte")

    created_at_range = filters.DateFromToRangeFilter(field_name="created_at")

    order = filters.OrderingFilter(
        fields=(
            ('id', 'id'),
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
            ('created_at', 'created_at'),
        ),
        field_labels={
            'name': 'Name',
            'surname': 'Surname',
            'email': 'Email',
            'phone': 'Phone',
            'age': 'Age',
            'course': 'Course',
            'course_type': 'Course Type',
            'course_format': 'Course Format',
            'status': 'Status',
            'sum': 'Sum',
            'alreadyPaid': 'Already Paid',
            'created_at': 'Created At',
        }
    )

    class Meta:
        model = OrderModels
        fields = [
            'id', 'name', 'surname', 'email', 'phone', 'age',
            'course', 'course_type', 'course_format', 'status',
            'sum', 'alreadyPaid', 'created_at',
        ]

