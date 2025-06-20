from rest_framework import serializers

from apps.applications.models import CommentModels, OrderModels
from apps.groups.models import GroupModel


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.profile.surname", read_only=True)
    created_at = serializers.DateTimeField()

    class Meta:
        model = CommentModels
        fields = (
            "text", "author", "created_at"
        )

    def get_author(self, obj):
        return getattr(obj.author.profile, "surname", "Unknown") if obj.author and hasattr(obj.author,
                                                                                           "profile") else "Unknown"


class ApplicationSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    manager = serializers.SerializerMethodField()
    group = serializers.SerializerMethodField(read_only=True)
    group_id = serializers.PrimaryKeyRelatedField(
        queryset=GroupModel.objects.all(),
        source="group",
        write_only=True,
        required=False,
    )

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
            'group_id',
            'utm',
            'comments'

        )
        read_only_fields = ('id', 'created_at',)
        ordering = ('-created_at',)

    def get_manager(self, obj):
        return obj.manager.profile.surname if obj.manager else None

    def get_group(self, obj):
        return obj.group.name if obj.group else None

    def update(self, instance, validated_data: dict):
        request = self.context.get('request')

        if request and hasattr(request, 'user') and request.user.is_active:
            if instance.manager is None:
                instance.manager = request.user

            group = validated_data.get('group_id')
            if group:
                instance.group = group
            instance.save()

        return super().update(instance, validated_data)
