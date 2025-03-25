from django_filters import rest_framework as filters

from apps.applications.choices.course_choices import Course
from apps.applications.models import OrderModels


class ApplicateFilter(filters.FilterSet):
    age_lt = filters.NumberFilter('age', 'lt')
    age_gt = filters.NumberFilter('age', 'gt')
    age_in = filters.NumberFilter('age', 'in')
    age_range = filters.RangeFilter('age')

    name_endswith = filters.CharFilter("name", "endswith")
    course = filters.ChoiceFilter("course", choices=Course.choices)

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
        fields = ['id', 'name', 'surname', 'email',
                  'phone', 'age', 'course', 'course_type',
                  'course_format', 'status',
                  'sum', 'alreadyPaid', 'created_at', ]
