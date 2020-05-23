from django.urls import path, include
from .views import helloAPI, randomQuiz

urlpatterns = [
  path('hello/', helloAPI),
  path('<int:id>/', randomQuiz),
]