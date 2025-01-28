from django.db import models

from apps.applications.choices.courseChoices import Course, CourseFormat, CourseType
from apps.applications.choices.statusType import StatusType


class OrderModels(models.Model):
    class Meta:
        db_table = 'orders'
        ordering = ['-id']
        # managed = False

    name = models.CharField(max_length=25, null=False, blank=False)
    surname = models.CharField(max_length=25, null=False, blank=False)
    email = models.EmailField(max_length=100, null=False, blank=False)
    phone = models.CharField(max_length=12, null=False, blank=False)
    age = models.IntegerField(null=False, blank=False)
    course = models.CharField(max_length=10, choices=Course.choices, null=False, blank=False)
    course_format = models.CharField(max_length=15, choices=CourseFormat.choices, null=False, blank=False)
    course_type = models.CharField(max_length=100, choices=CourseType.choices, null=False, blank=False)
    sum = models.IntegerField(null=False, blank=False)
    alreadyPaid = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    utm = models.CharField(max_length=100, null=True, blank=True)
    msg = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=15, choices=StatusType.choices, null=False, blank=True)
