from django.db import models

from core.models import BaseModel


class GroupModel(BaseModel):
    class Meta:
        db_table = 'groups_order'
        ordering = ['id']

    name = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.name
