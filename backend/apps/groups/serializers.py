from rest_framework import serializers

from apps.groups.models import GroupModel


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupModel

        fields = ('id', 'name', 'created_at', 'updated_at')

        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data: dict):
        group = GroupModel.objects.create(**validated_data)
        return group
