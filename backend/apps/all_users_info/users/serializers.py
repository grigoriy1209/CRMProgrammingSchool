from django.db.transaction import atomic

from rest_framework import serializers

from apps.all_users_info.users.models import ProfileModel, UserModel

from core.services.email_service import EmailService


class ManagerSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='profile.name')
    surname = serializers.CharField(source='profile.surname')

    class Meta:
        model = UserModel
        fields = ('id', 'name', 'surname')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = ('id', 'name', 'surname', 'created_at', 'updated_at')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = UserModel
        fields = (
            'id',
            'email',
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

    @atomic
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = UserModel.objects.create_user(**validated_data)
        profile = ProfileModel.objects.create(**profile_data, user=user)
        EmailService.register(user)
        user.save()
        return user

    @atomic
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        profile_data = validated_data.pop('profile')
        if profile_data:
            profile_instance = instance.profile
            for attr, value in profile_data.items():
                setattr(profile_instance, attr, value)
            profile_instance.save()

        instance.save()
        return instance
