

from rest_framework import serializers

from apps.applications.models import OrderModels


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModels

        fields = (
            'id',
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

    def create(self, validated_data:dict):
        application = OrderModels.objects.create(**validated_data)
        return application


