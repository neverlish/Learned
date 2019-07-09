from django.urls import path

from .views import *

urlpatterns = [
    path('fetch/',todo_fetch,name='fetch'),
    path('save/',todo_save, name='save'),
]