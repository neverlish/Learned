from django.shortcuts import render
from .models import GuessNumbers
from .forms import PostForm

def index(request):
  lottos = GuessNumbers.objects.all()
  return render(request, 'lotto/default.html', {'lottos': lottos})

def post(request):
  form = PostForm()
  return render(request, 'lotto/form.html', {'form': form})
