from django.views.generic.list import ListView

from .models import Bookmark

class BookmarkListView(ListView):
    model = Bookmark