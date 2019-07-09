from django.contrib import admin

from .models import Booking

class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'subscriber', 'room', 'date_from', 'date_to', 'created', 'updated']
    list_editable = ['room', 'date_from', 'date_to']
    raw_id_fields = ['subscriber']

admin.site.register(Booking, BookingAdmin)