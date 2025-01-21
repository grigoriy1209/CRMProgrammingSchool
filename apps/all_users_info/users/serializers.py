from rest_framework import serializers

from apps.all_users_info.users.models import UserModel


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = (
            'id',
            'email',
            'password',
            'role_type',
            'created_at',
            'last_login',
        )
        extra_kwargs = {
            'password': {'write_only': True},
        }
