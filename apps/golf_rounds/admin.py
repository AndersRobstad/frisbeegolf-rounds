from django.contrib import admin
from .models import GolfRound, HoleResult, GolfRoundAdmin

# Register your models here.
admin.site.register(HoleResult)
admin.site.register(GolfRound, GolfRoundAdmin)