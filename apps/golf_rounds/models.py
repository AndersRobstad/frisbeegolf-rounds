from django.db import models
from django.db.models.fields.json import JSONField
from django.db.models.fields.related import ForeignKey
from courses.models import Course, Hole
from users.models import User
from django.contrib import admin

class HoleResult(models.Model):
    hole = ForeignKey(Hole, on_delete=models.CASCADE)
    scores = JSONField()

    def get_par(self):
        return self.hole.par

    def __str__(self):
        return str(self.hole.hole_no) + " - " + str(self.scores)

class GolfRoundAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class GolfRound(models.Model):
    # Burde virkelig ikke være satt til cascase, men funker så lenge ikke brukere
    # kan slette sine egne brukere. :)))
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="request_owner")
    course = models.ForeignKey(Course ,on_delete=models.CASCADE)
    players = models.ManyToManyField(User)
    hole_results = models.ManyToManyField(HoleResult, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    finished = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.hole_results.all().delete()
        super(GolfRound, self).delete(*args, **kwargs)

    def __str__(self):
        return (self.course.name + " (" + str(self.date))[0:-16] + ")"