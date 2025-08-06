from django.db import models

# Create your models here.
# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    username = models.CharField(max_length=25, unique=True)




class Child(models.Model):
    number = models.CharField(unique=True,max_length=4)
    first_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    village = models.CharField(max_length=40)
    contact = models.CharField(max_length=10)
    parent_name = models.CharField(max_length=50,null=True, blank=True)
    def __str__(self):
        return self.number

class Village(models.Model):
    name = models.CharField(max_length=40)
    def __str__(self):
        return self.name
    

