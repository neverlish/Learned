from django.urls import path

from . import views

urlpatterns = [
  path('email/', views.send_test_email),
  path('error/', views.occur_error),
]