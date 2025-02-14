from django_filters import rest_framework as filters

from apps.applications.models import OrderModels


class ApplicateFilter(filters.FilterSet):

    order = filters.OrderingFilter(
        fields=(
            ('id','id'),
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
        fields = ['order']