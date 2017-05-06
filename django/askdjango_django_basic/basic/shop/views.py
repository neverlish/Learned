from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import SignupForm, LoginForm
from django.contrib.auth.views import login as auth_login
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.templatetags.socialaccount import get_providers

def signup(request):
  if request.method == 'POST':
    form = SignupForm(request.POST)
    if form.is_valid():
      form.save()
      return redirect(settings.LOGIN_URL)
  else:
    form = SignupForm()
  return render(request, 'accounts/signup_form.html', {
    'form': form
  })

@login_required
def profile(request):
  return render(request, 'accounts/profile.html')

def login(request):
  providers = []
  for provider in get_providers(): #settting/INSTALLED_APP 내에서 활성화된 목록
    # social app 속성은 provider에는 없는 속성
    try:
      # 실제 provider 별 Client id/secret이 등록이 되어 있는가?
      provider.social_app = SocialApp.objects.get(provider=provider.id, sites=settings.SITE_ID)
    except SocialApp.DoesNotExist:
      provider.social_app = None
    providers.append(provider)
  
  return auth_login(request,
    authentication_form=LoginForm,
    template_name='accounts/login_form.html',
    extra_context={'providers': providers})

    # url(r'^login/$', auth_views.login, name='login', 
  #   kwargs={
  #     'authentication_form': LoginForm,
  #     'template_name': 'accounts/login_form.html',
  #   }),
