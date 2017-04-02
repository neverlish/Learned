import re
from django.db import models
from django.forms import ValidationError
from django.utils import timezone

def lnglat_validator(value):
  if not re.match(r'^([+-]?\d+\.?\d*),([+-]?\d+\.?\d*)$', value):
    raise ValidationError('Invalid LngLat Type')

class Post(models.Model):
  author = models.CharField(max_length=20)
  title = models.CharField(max_length=100, verbose_name='제목', help_text='포스팅 제목을 입력해주세요. 최대 100자 내외.')
  content = models.TextField()
  tags = models.CharField(max_length=100, blank=True)
  lnglat = models.CharField(max_length=50, blank=True, validators=[lnglat_validator], help_text='경도, 위도 포맷으로 입력')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
