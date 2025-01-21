from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models

from apps.all_users_info.users.managers import UserManager
from core.models import BaseModel


class UserModel(AbstractUser, BaseModel, PermissionsMixin):
    class Meta:
        db_table = 'auth_users'

    email = models.EmailField(unique=True)
    status = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()


class ProfileModel(BaseModel):
    class Meta:
        db_table = 'profiles'

    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profiles')
