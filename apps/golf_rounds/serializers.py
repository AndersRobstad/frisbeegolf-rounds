from users.models import User
from rest_framework import serializers
from .models import GolfRound, HoleResult
from courses.serializers import HoleSerializer, CourseNameSerializer


class HoleResultSerializer(serializers.ModelSerializer):
    hole = HoleSerializer()

    class Meta:
        model = HoleResult
        fields = '__all__'

class UsernameRelatedField(serializers.RelatedField):
    
    def get_queryset(self):
        return User.objects.all()
    
    def to_representation(self, value):
        return value.username
    
    def to_internal_value(self, value):
        return User.objects.get(id = value)

class GolfRoundDetailSerializer(serializers.ModelSerializer):
    players = UsernameRelatedField(many=True)
    hole_results = HoleResultSerializer(many=True, required=False)
    course = CourseNameSerializer()
    scores = serializers.SerializerMethodField()

    def get_scores(self, obj):
        number_of_players = len(obj.players.all())
        result = [0 for x in range(number_of_players)]
        for hole_result in obj.hole_results.all():
            par = hole_result.get_par()
            scores = hole_result.scores
            for i in range(number_of_players):
                result[i] = result[i] + ((scores[i] - par) if scores[i] != 0 else 0)
        return result

    class Meta:
        model = GolfRound
        fields = '__all__'


class GolfRoundSerializer(serializers.ModelSerializer):
    players = UsernameRelatedField(many=True)
    hole_results = HoleResultSerializer(many=True, required=False)

    class Meta:
        model = GolfRound
        fields = '__all__'

        extra_kwargs = {'owner': {'required': False}}

    def create(self, validated_data):
        course = validated_data["course"]
        players = validated_data['players']
        golf_round = GolfRound.objects.create(course=course, owner=self.context['owner'])
        hole_results = generate_hole_results(course.holes.all(), len(players))
        golf_round.players.set(players)
        golf_round.hole_results.set(hole_results)
        return golf_round


def generate_hole_results(holes, players):
    hole_results = []
    for hole in holes:
        scores = [0 for i in range(players)]
        hole_results.append(HoleResult.objects.create(hole=hole, scores=scores))
    return hole_results
