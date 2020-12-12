## testapi/views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .task import send_email

@api_view(['GET'])
@permission_classes([AllowAny])
def send_test_email(requset):
    send_email.delay()
    return Response({"message": "ok"})