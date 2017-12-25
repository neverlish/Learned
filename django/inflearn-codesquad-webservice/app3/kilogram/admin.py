from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Photo, Profile

class ProfileInline(admin.StackedInline):
  model = Profile
  can_delete = False

class CustomUserAdmin(UserAdmin):
  inlines = (ProfileInline,)

admin.site.register(Photo)
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
