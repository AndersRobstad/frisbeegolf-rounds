from rest_framework import serializers
from .models import Course, Hole


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'

class HoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hole
        fields = '__all__'

class CourseNameAndIdSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('name', 'id')

class CourseNameSerializer(serializers.ModelSerializer):
    holes = serializers.SerializerMethodField()

    def get_holes(self, obj):
        return obj.holes.count()

    class Meta:
        model = Course
        fields = ('name', 'holes')