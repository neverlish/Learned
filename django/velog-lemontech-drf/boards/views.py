from rest_framework import viewsets, permissions

from .serializers import BoardSerializer
from .models import Board

class BoardViewSet(viewsets.ModelViewSet):
  queryset = Board.objects.all()
  serializer_class = BoardSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)