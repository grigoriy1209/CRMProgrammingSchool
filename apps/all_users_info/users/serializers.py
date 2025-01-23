from rest_framework import serializers

from apps.all_users_info.users.models import ProfileModel, UserModel


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = ('id', 'name', 'surname', 'phone', 'created_at', 'updated_at')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = UserModel
        fields = (
            'id',
            'email',
            'password',
            'is_active',
            'is_staff',
            'is_superuser',
            'role_type',
            'last_login',
            'created_at',
            'updated_at',
            'profile',
        )
        read_only_fields = (
            'id',
            'is_active',
            'is_staff',
            'is_superuser',
            'last_login',
            'created_at',
            'updated_at',

        )
        extra_kwargs = {
            'password': {"write_only": True},
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')

        user = UserModel.objects.create_user(**validated_data)
        profile = ProfileModel.objects.create(**profile_data, user=user)
        user.save()
        return user
