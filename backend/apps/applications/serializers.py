from rest_framework import serializers

from apps.all_users_info.auth.views import UserModel
from apps.all_users_info.users.models import ProfileModel
from apps.all_users_info.users.serializers import ManagerSerializer
from apps.applications.models import CommentModels, OrderModels
from apps.groups.models import GroupModel


class ProfileShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = ('name', "surname")


class CommentManagerSerializer(serializers.ModelSerializer):
    profile = ProfileShortSerializer(read_only=True)

    class Meta:
        model = UserModel
        fields = ("id", "profile",)


class CommentSerializer(serializers.ModelSerializer):
    # author = serializers.CharField(source="author.profile.surname", read_only=True)
    # created_at = serializers.DateTimeField()
    manager = ManagerSerializer(read_only=True)

    class Meta:
        model = CommentModels
        fields = (
            "id",
            "comment",
            "created_at",
            "order_id",
            "manager",
        )


class ApplicationSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    # manager = serializers.SerializerMethodField()
    manager = ManagerSerializer(read_only=True)
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

    def get_group(self, obj):
        return obj.group.name if obj.group else None

    def update(self, instance, validated_data: dict):
        request = self.context.get('request')

        if request and hasattr(request, 'user') and request.user.is_active:
            if instance.manager is None:
                instance.manager = request.user

            group = validated_data.get('group_id')
            if group:
                validated_data['group'] = group

        return super().update(instance, validated_data)
