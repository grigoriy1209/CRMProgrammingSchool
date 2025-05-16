from django.db import models


class Course(models.TextChoices):
    FS = "FS"
    QACX = "QACX"
    JCX = "JCX"
    JSCX = "JSCX"
    FE = "FE"
    PCX = "PCX"


class CourseType(models.TextChoices):
    PRO = 'pro'
    MINIMAL = 'minimal'
    PREMIUM = 'premium'
    INCUBATOR = 'incubator'
    VIP = 'vip'


class CourseFormat(models.TextChoices):
    STATIC = 'static'
    ONLINE = 'online'
