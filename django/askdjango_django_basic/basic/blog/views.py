# from django.http import Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Post, Comment
from .forms import PostForm

def post_list(request):
  qs = Post.objects.all().prefetch_related('tag_set', 'comment_set')
  q = request.GET.get('q', '')
  if q:
      qs = qs.filter(title__icontains=q)
  return render(request, 'blog/post_list.html', {
    'post_list': qs,
    'q': q,
  })

def post_detail(request, id):
    # try:
    #     post = Post.objects.get(id=id)
    # except Post.DoesNotExist:
    #     raise Http404
    post = get_object_or_404(Post, id=id)    
    return render(request, 'blog/post_detail.html', {
        'post': post,
    })

def post_new(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save()
            messages.success(request, '새 포스팅을 저장했습니다.')
            return redirect(post)
    else:
        form = PostForm()
    return render(request, 'blog/post_form.html', {
        'form': form,
    })

def post_edit(request, id):
    post = get_object_or_404(Post, id=id)
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            post = form.save()
            messages.success(request, '포스팅을 수정했습니다.')
            return redirect(post)
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/post_form.html', {
        'form': form,
    })

def comment_list(request):
    comment_list = Comment.objects.all().select_related('post')
    return render(request, 'blog/comment_list.html', {
        'comment_list': comment_list,
    })
