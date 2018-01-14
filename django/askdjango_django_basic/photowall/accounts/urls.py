from django.conf.urls import url
from django.contrib.auth.views import login, logout
from . import views

urlpatterns = [
  url(r'^login/$', login, name='login', kwargs={
    'template_name': 'accounts/login_form.html',
  }),
  url(r'^logout/$', logout, name='logout', kwargs={
    'next_page': 'login',
  }),
  url(r'^signup/$', views.signup, name='signup'),
  url(r'^profile/$', views.profile, name='profile'),
]
