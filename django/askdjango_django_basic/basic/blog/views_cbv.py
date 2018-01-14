from django import forms
from django.views.generic import CreateView
from .models import Post

class PostForm(forms.ModelForm):
  class Meta:
    model = Post
    fields = '__all__'

class PostCreateView(CreateView):
  model = Post
  form_class = PostForm

post_new = PostCreateView.as_view()
