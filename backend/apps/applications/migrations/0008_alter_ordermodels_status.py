# Generated by Django 5.1.6 on 2025-02-20 20:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('applications', '0007_ordermodels_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordermodels',
            name='status',
            field=models.CharField(
                choices=[('InWork', 'InWork'), ('New', 'New'), ('Agree', 'Agree'), ('Disagree', 'Disagree'),
                         ('Dubbing', 'Dubbing')], max_length=15),
        ),
    ]
