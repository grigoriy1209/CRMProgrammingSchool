from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from apps.all_users_info.users.choices import RoleType
from apps.all_users_info.users.managers import UserManager

from core.models import BaseModel


class UserModel(AbstractBaseUser, BaseModel, PermissionsMixin):
    class Meta:
        db_table = 'auth_users'

    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    role_type = models.CharField(choices=RoleType.choices, max_length=20)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

