from rest_framework import serializers
from games.models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id',
                  'name',
                  'release_date',
                  'game_category',
                  'played')
