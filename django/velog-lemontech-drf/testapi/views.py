from django.core.mail.message import EmailMessage
from api_server import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

FROM_EMAIL = settings.EMAIL_HOST_USER

@api_view(['GET'])
@permission_classes([AllowAny])
def send_test_email(request):
  subject = '이메일 테스트'
  message = 'email test가 성공했습니다.'
  to=['neverlish@gmail.com']
  EmailMessage(subject=subject, body=message, to=to, from_email=FROM_EMAIL).send()

  return Response({'message': 'ok'})