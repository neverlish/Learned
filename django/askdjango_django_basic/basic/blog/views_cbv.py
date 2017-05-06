from django import forms
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from .models import Post

class PostListView(ListView):
  model = Post
  queryset = Post.objects.all().prefetch_related('tag_set', 'comment_set')
  paginate_by = 10

post_list = PostListView.as_view()
# post_list = ListView.as_view(model=Post, 
#                              queryset=Post.objects.all().prefetch_related('tag_set', 'comment_set'),
#                              paginate_by=3)

post_detail = DetailView.as_view(model=Post, pk_url_kwarg='id')

post_new = CreateView.as_view(model=Post, success_url='/blog/')

post_edit = UpdateView.as_view(model=Post, fields='__all__')

post_delete = DeleteView.as_view(model=Post, success_url=reverse_lazy('blog:post_list'))
