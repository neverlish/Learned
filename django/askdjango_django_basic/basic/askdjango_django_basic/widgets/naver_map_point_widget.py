import re
from django import forms
from django.conf import settings # django/conf/global_setting.py + askdjango_django_basic/setting.py
from django.template.loader import render_to_string

class NaverMapPointWidget(forms.TextInput):
  BASE_LAT, BASE_LNG = '37.497921', '127.027636' # 강남역

  def render(self, name, value, attrs):
    width = str(self.attrs.get('width', 800))
    height = str(self.attrs.get('height', 800))
    if width.isdigit(): width += 'px'
    if height.isdigit(): height += 'px'

    context = {
      'naver_client_id': settings.NAVER_CLIENT_ID,
      'id': attrs['id'], # 현재 formfield의  html id
      'width': width, 'height': height,
      'base_lat': self.BASE_LAT, 'base_lng': self.BASE_LNG
    }

    if value:
      try:
        lng, lat = re.findall(r'[+-]?[\d\.]+', value)
        context.update({'base_lat': lat, 'base_lng': lng})
      except (IndexError, ValueError):
        pass

    attrs['readonly'] = 'readonly'
    parent_html = super().render(name, value, attrs)

    html = render_to_string('widgets/naver_map_point_widget.html', context)

    return parent_html + html
