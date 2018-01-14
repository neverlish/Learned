from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^(?P<pk>\d+)/$', views.post_detail, name='post_detail')
]
