from django.db import models


class RoleType(models.TextChoices):
    ADMINISTRATOR = 'ADMINISTRATOR'
    MANAGER = 'MANAGER'

