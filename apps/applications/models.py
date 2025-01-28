from django.db import models
from django.utils import timezone

from apps.applications.choices.courseChoices import Course, CourseFormat, CourseType
from apps.applications.choices.statusType import StatusType


class OrderModels(models.Model):
    class Meta:
        db_table = 'orders'
        ordering = ['-id']

    name = models.CharField(max_length=25,)
    surname = models.CharField(max_length=25, )
    email = models.EmailField(max_length=100, )
    phone = models.CharField(max_length=12,)
    age = models.IntegerField()
    course = models.CharField(max_length=10, choices=Course.choices, )
    course_format = models.CharField(max_length=15, choices=CourseFormat.choices,)
    course_type = models.CharField(max_length=100, choices=CourseType.choices,)
    sum = models.IntegerField()
    alreadyPaid = models.IntegerField(default=0,)
    created_at = models.DateTimeField(default=timezone.now)
    utm = models.CharField(max_length=100,)
    msg = models.CharField(max_length=100, )
    status = models.CharField(max_length=15, choices=StatusType.choices,)
