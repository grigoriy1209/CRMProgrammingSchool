from django.db import models


class StatusType(models.TextChoices):
    INWORK = 'InWork', 'InWork'
    NEW = 'New', 'New'
    AGGRE = 'Aggre', 'Aggre'
    DISAGGRE = 'Disaggre', 'Disaggre'
    DUBING = 'Dubing', 'Dubing'
