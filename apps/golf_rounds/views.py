from rest_framework import serializers, status
from .models import GolfRound, HoleResult
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .serializers import GolfRoundDetailSerializer, GolfRoundSerializer
from users.models import User
from users.serializers import UsernameAndIdSerializer
from courses.models import Course
from courses.serializers import CourseNameAndIdSerializer
from django.db.models import Q
from django.shortcuts import get_object_or_404

class GolfRoundView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rounds = GolfRound.objects.filter(Q(players__id = request.user.id) | Q(owner=request.user.id)).distinct()
        ongoing_rounds = []
        finished_rounds = []
        for round in rounds:
            if not round.finished and round.owner == request.user:
                ongoing_rounds.append(round)
            elif round.finished:
                finished_rounds.append(round)
        ongoing_serializer = GolfRoundDetailSerializer(ongoing_rounds, many=True)
        finished_serializer = GolfRoundDetailSerializer(finished_rounds, many=True)
        return Response({'ongoing_rounds': ongoing_serializer.data, 'finished_rounds': finished_serializer.data})

class NewGolfRoundView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        users = User.objects.all()
        user_serializer = UsernameAndIdSerializer(users, many=True)
        courses = Course.objects.all()
        course_serializer = CourseNameAndIdSerializer(courses, many=True)
        return Response({'users': user_serializer.data, 'courses':course_serializer.data})

    def post(self, request):
        round_serializer = GolfRoundSerializer(data = request.data, context={'owner': request.user})
        print(round_serializer)
        if (round_serializer.is_valid()):
            round_serializer.save()
            return Response(round_serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(round_serializer.errors)

class RoundDetails(APIView):

    permission_classes = [AllowAny]
    # Lag permission class for isOwner eller noe. 

    def get(self, request, id):
        round = get_object_or_404(GolfRound, id=id)
        serializer = GolfRoundSerializer(round)
        return Response(serializer.data)

    def post(self, request, id):
        round = get_object_or_404(GolfRound, id=id)
        round.finished = True
        hole_scores = get_object_or_404(HoleResult, id=request.data['lastHoleId'])
        hole_scores.scores = request.data['lastHoleScores']
        round.save()
        hole_scores.save()
        return Response(round.id)

class FinishHoleView(APIView):

    def post(self, request, id):
        hole_result = get_object_or_404(HoleResult, id=id)
        hole_result.scores = request.data['scores']
        hole_result.save()
        return Response()

class RoundOverviewView(APIView):

    def get(self, request, id):
        round = get_object_or_404(GolfRound, id=id)
        serializer = GolfRoundDetailSerializer(round)
        return Response(serializer.data)