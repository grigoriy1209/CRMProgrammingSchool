from django.contrib.auth import get_user_model

from rest_framework import serializers

from core.dataclasses.user_dataclass import User

UserModel: User = get_user_model()


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('password',)

    password = serializers.CharField(write_only=True, min_length=6)

    def validate_password(self, value):
        return value
