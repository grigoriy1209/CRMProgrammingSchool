from django.db import models
from django.utils import timezone

from apps.applications.choices.course_choices import Course, CourseFormat, CourseType
from apps.applications.choices.status_type import StatusType
from apps.groups.models import GroupModel


class OrderModels(models.Model):
    class Meta:
        db_table = 'orders'
        ordering = ['-id']

    name = models.CharField(max_length=25, )
    surname = models.CharField(max_length=25, )
    email = models.EmailField(max_length=100, )
    phone = models.CharField(max_length=12, )
    age = models.IntegerField()
    course = models.CharField(max_length=10, choices=Course.choices, )
    course_format = models.CharField(max_length=15, choices=CourseFormat.choices, )
    course_type = models.CharField(max_length=100, choices=CourseType.choices, )
    sum = models.IntegerField()
    alreadyPaid = models.IntegerField(default=0, )
    created_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=15, choices=StatusType.choices, )

    manager = models.ForeignKey('users.UserModel', on_delete=models.SET_NULL, null=True, blank=True,
                                related_name='orders')

    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, null=True, blank=True,
                              related_name='orders')

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
