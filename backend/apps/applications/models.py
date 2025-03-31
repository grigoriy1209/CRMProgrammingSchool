from django.contrib.auth import get_user_model
from django.core import validators as V
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from apps.applications.choices.course_choices import Course, CourseFormat, CourseType
from apps.applications.choices.status_type import StatusType
from apps.applications.regex import ApplicationRegex
from apps.groups.models import GroupModel
from core.dataclasses.user_dataclass import User

UserModel: User = get_user_model()


class OrderModels(models.Model):
    class Meta:
        db_table = 'orders'
        ordering = ['-id']

    name = models.CharField(max_length=25,
                            validators=[V.RegexValidator(ApplicationRegex.NAME.pattern, ApplicationRegex.NAME.msg)])
    surname = models.CharField(max_length=25,
                               validators=[
                                   V.RegexValidator(ApplicationRegex.SURNAME.pattern, ApplicationRegex.SURNAME.msg)])
    email = models.EmailField(max_length=100,)
    phone = models.CharField(max_length=12,
                             validators=[V.RegexValidator(ApplicationRegex.PHONE.pattern, ApplicationRegex.PHONE.msg)])
    age = models.IntegerField(validators=[MinValueValidator(17),MaxValueValidator(99)])
    course = models.CharField(max_length=10, choices=Course.choices, )
    course_format = models.CharField(max_length=15, choices=CourseFormat.choices, )
    course_type = models.CharField(max_length=100, choices=CourseType.choices, )
    sum = models.IntegerField(validators=[V.MinValueValidator(1), V.MaxValueValidator(1_000_000)])
    alreadyPaid = models.IntegerField(default=0, )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=15, choices=StatusType.choices, )

    manager = models.ForeignKey(UserModel, on_delete=models.SET_NULL, null=True, blank=True,
                                related_name='orders')

    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, null=True, blank=True,
                              related_name='orders')

    msg = models.TextField(null=True, blank=True, max_length=100)
    utm = models.CharField(max_length=100, null=True, blank=True)

    def assign_manager(self, user):
        if not self.manager:
            self.manager = user
            self.save(update_fields=['manager'])
            return True
        return False

    def get_manager_name(self):
        if self.manager:
            return f'{self.manager.name} {self.manager.surname}'
        return 'No manager assigned'


class CommentModels(models.Model):
    class Meta:
        db_table = 'comments'

    order = models.ForeignKey(OrderModels, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE, null=True, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
