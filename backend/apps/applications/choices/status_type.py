from django.db import models


class StatusType(models.TextChoices):
    INWORK = 'InWork', 'InWork'
    NEW = 'New', 'New'
    AGREE = 'Agree', 'Agree'
    DISAGREE = 'Disagree', 'Disagree'
    DUBBING = 'Dubbing', 'Dubbing'
