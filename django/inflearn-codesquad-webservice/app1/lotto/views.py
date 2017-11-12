from django.shortcuts import render
from .models import GuessNumbers

def index(request):
  lottos = GuessNumbers.objects.all()
  return render(request, 'lotto/default.html', {'lottos': lottos})
