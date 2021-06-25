from django.db import models

# Create your models here.

class Hole(models.Model):
    hole_no = models.IntegerField()
    length = models.IntegerField()
    par = models.IntegerField()

    def __str__(self):
        return 'Hole: ' + str(self.hole_no) + ', Par ' + str(self.par) + ' - ' + str(self.length) + 'm'

class Course(models.Model):
    name = models.CharField(max_length=40, unique=True)
    holes = models.ManyToManyField(Hole)

    def __str__(self):
        return self.name

