from django.contrib import admin
from .models import Course, Hole

# Register your models here.
admin.site.register(Hole)
admin.site.register(Course)