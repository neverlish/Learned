from django.shortcuts import render, redirect
from django.conf import settings
from .forms import SignupForm

def signup(request):
  if request.method == 'POST':
    form = SignupForm(request.POST)
    if form.is_valid():
      user = form.save()
      return redirect(settings.LOGIN_URL)
  else:
    form = SignupForm()
  return render(request, 'accounts/signup_form.html', {
    'form': form,
  })

def profile(request):
  return render(request, 'accounts/profile.html')
