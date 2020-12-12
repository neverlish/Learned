from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .serializers import UserCreateSerializer
from .models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
  if request.method == 'POST':
    serializer = UserCreateSerializer(data=request.data)

    if not serializer.is_valid(raise_exception=True):
      return Response({'message': 'Request Body Error.'}, status=status.HTTP_409_CONFLICT)

    if User.objects.filter(email=serializer.validated_data['email']).first() is None:
      serializer.save()
      return Response({'message': 'ok'}, status=status.HTTP_201_CREATED)
    
    return Response({'message': 'duplicated email'}, status=status.HTTP_409_CONFLICT)