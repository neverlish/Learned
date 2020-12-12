from rest_framework import viewsets, permissions

from .serializers import BoardSerializer, CommentSerializer
from .models import Board, Comment

class BoardViewSet(viewsets.ModelViewSet):
  queryset = Board.objects.all()
  serializer_class = BoardSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)

class CommentViewSet(viewsets.ModelViewSet):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):
    return serializer.save(user=self.request.user)