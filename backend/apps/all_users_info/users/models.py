from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from apps.all_users_info.users.choices import RoleType
from apps.all_users_info.users.managers import UserManager

from core.models import BaseModel


class UserModel(AbstractBaseUser, BaseModel, PermissionsMixin):
    class Meta:
        db_table = 'auth_users'
        ordering = ['-id']

    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    role_type = models.CharField(choices=RoleType.choices, max_length=20, default=RoleType.MANAGER)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()


class ProfileModel(BaseModel):
    class Meta:
        db_table = 'profile'

    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')

    def get_full_name(self):
        return f'{self.name} {self.surname}'
