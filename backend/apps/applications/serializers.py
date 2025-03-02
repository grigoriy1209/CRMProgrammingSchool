from rest_framework import serializers

from apps.applications.models import CommentModels, OrderModels


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.profile.surname", read_only=True)
    created_at = serializers.DateTimeField()

    class Meta:
        model = CommentModels
        fields = (
            "text", "author", "created_at"
        )


class ApplicationSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    # manager = serializers.CharField(source="manager.profile.surname", read_only=True)
    # group = serializers.CharField(source="group.name", read_only=True)
    # manager = UserSerializer(read_only=True,)
    # group = GroupSerializer(read_only=True)
    manager = serializers.SerializerMethodField()
    group = serializers.PrimaryKeyRelatedField(read_only=True)

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
            'manager',
            'group',
            'msg', 'utm', 'comments'

        )
        read_only_fields = ('id', 'created_at',)
        ordering = ('-created_at',)

    def get_manager(self, obj):
        return obj.manager.profile.surname if obj.manager else None

    def create(self, validated_data: dict):
        application = OrderModels.objects.create(**validated_data)
        return application

    def update(self, instance, validated_data: dict):
        request = self.context.get('request')

        if request and hasattr(request, 'user') and request.user.is_active:
            if 'manager' in validated_data and instance.manager is None:
                instance.manager = request.user
        return super().update(instance, validated_data)
