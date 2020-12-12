from rest_framework import serializers
from .models import Board

class BoardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Board
    fields = ('author', 'id', 'title', 'body', 'created_at', 'modified_at')
