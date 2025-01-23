from rest_framework import serializers

from apps.applications.models import ApplicationModels


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationModels

        fields = (
            'name',
            'surname',
            'email',
            'phone',
            'age',
            'course',
            'course_type',
            'course_format',
            'status',
            'sum',
            'alreadyPaid',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')
