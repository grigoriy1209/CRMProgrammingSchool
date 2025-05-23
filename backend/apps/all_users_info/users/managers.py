from django.contrib.auth.models import UserManager as Manager

from apps.all_users_info.users.choices import RoleType


class UserManager(Manager):

    def create_user(self, email=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')
        # if not password:
        #     raise ValueError('User must have a password')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_unusable_password()
        user.save()
        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        extra_fields.setdefault('role_type', RoleType.ADMINISTRATOR)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        if extra_fields.get('is_active') is not True:
            raise ValueError('Superuser must have is_active=True.')

        superuser = self.create_user(email=email, password=password, **extra_fields)

        from apps.all_users_info.users.models import ProfileModel
        ProfileModel.objects.create(
            user=superuser,
            name="Admin",
            surname="Administer",
            phone="555555555"
        )
        return superuser
