# Generated by Django 5.2.4 on 2025-08-01 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='child',
            name='number',
            field=models.CharField(max_length=4, unique=True),
        ),
    ]
