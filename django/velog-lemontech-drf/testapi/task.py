from __future__ import absolute_import, unicode_literals
from celery import shared_task
from django.core.mail.message import EmailMessage

from api_server import settings
FROM_EMAIL = settings.EMAIL_HOST_USER

@shared_task
def send_email():
    subject = "이메일 테스트3"
    to = ['neverlish@gmail.com']
    message = "email test가 성공했습니다."
    EmailMessage(subject=subject, body=message, to=to, from_email=FROM_EMAIL).send()
    return True