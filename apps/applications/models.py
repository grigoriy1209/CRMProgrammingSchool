from django.db import models
from django.utils import timezone

from apps.applications.choices.courseChoices import Course, CourseFormat, CourseType
from apps.applications.choices.statusType import StatusType


class ApplicationModels(models.Model):
    class Meta:
        db_table = 'applications'

    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=100)
    age = models.IntegerField()
    course = models.CharField(max_length=20, choices=Course.choices)
    course_type = models.CharField(max_length=20, choices=CourseType.choices)
    course_format = models.CharField(max_length=20, choices=CourseFormat.choices)
    status = models.CharField(max_length=20, choices=StatusType.choices)
    sum = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    alreadyPaid = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    created_at = models.DateTimeField(default=timezone.now)
