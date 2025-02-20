from rest_framework import serializers

from apps.applications.models import CommentModels, OrderModels


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModels

        manager = serializers.CharField(source="get_manager_name", read_only=True)
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
            'manager',
            'group', 'message', 'utm'

        )
        read_only_fields = ('id', 'created_at', 'manager')

    def create(self, validated_data: dict):
        application = OrderModels.objects.create(**validated_data)
        return application

    def update(self, instance, validated_data: dict):
        request = self.context.get('request')

        if request and hasattr(request, 'user') and request.user.is_active:
            if 'manager' in validated_data and instance.manager is None:
                instance.manager = request.user
        return super().update(instance, validated_data)


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.surname", )
    created_at = serializers.DateTimeField()

    class Meta:
        model = CommentModels
        fields = {
            "text", "author", "created_at"
        }
