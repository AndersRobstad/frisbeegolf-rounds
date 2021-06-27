# Generated by Django 3.2.4 on 2021-06-26 08:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courses', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='HoleResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scores', models.JSONField()),
                ('hole', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.hole')),
            ],
        ),
        migrations.CreateModel(
            name='GolfRound',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('finished', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
                ('hole_results', models.ManyToManyField(blank=True, to='golf_rounds.HoleResult')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_owner', to=settings.AUTH_USER_MODEL)),
                ('players', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
