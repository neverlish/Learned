from django.conf.urls import url
from . import views
from .forms import LoginForm
from django.conf import settings
from django.contrib.auth import views as auth_views

urlpatterns = [
  url(r'^signup/$', views.signup, name='signup'),
  url(r'^login/$', auth_views.login, name='login', 
    kwargs={
      'authentication_form': LoginForm,
      'template_name': 'accounts/login_form.html',
    }),
  url(r'^logout/$', auth_views.logout, name='logout', 
    kwargs={'next_page': settings.LOGIN_URL}),
  url(r'^profile/$', views.profile, name='profile'),
]
