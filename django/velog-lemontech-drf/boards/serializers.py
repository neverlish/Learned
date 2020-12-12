from rest_framework import serializers
from .models import Board, Comment

class BoardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Board
    fields = ('author', 'id', 'title', 'body', 'created_at', 'modified_at')

class CommentSerializer(serializers.ModelSerializer):
  reply = serializers.SerializerMethodField()

  class Meta:
    model = Comment
    fields = ('board', 'id', 'user', 'parent', 'comment', 'created_at', 'reply')
    read_only_fields = ['user']

  def get_reply(self, instance):
    serializer = self.__class__(instance.reply, many=True)
    serializer.bind('', self)
    return serializer.data


class BoardOnlySerializer(serializers.ModelSerializer):
  parent_comments = serializers.SerializerMethodField()

  class Meta:
    model = Board
    fields = ('id', 'parent_comments')

  def get_parent_comments(self, obj):
    parent_comments = obj.comments.filter(parent=None)
    serializer = CommentSerializer(parent_comments, many=True)
    return serializer.data