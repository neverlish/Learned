from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^(?P<pk>\d+)/$', views.post_detail, name='post_detail'),
  url(r'^(?P<post_pk>\d+)/comment/new/$', views.comment_new, name='comment_new'),
  url(r'^(?P<post_pk>\d+)/comment/(?P<pk>\d+)/edit/$', views.comment_edit, name='comment_edit'),
  url(r'^(?P<post_pk>\d+)/comment/(?P<pk>\d+)/delete/$', views.comment_delete, name='comment_delete'),
]
