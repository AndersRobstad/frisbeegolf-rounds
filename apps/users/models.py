from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib import admin
# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True)

    def natural_key(self):
        return (self.username)

class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)