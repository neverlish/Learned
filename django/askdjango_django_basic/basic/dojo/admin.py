from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment, Tag

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
  list_display = ['id', 'title', 'tag_list', 'content_size', 'status', 'created_at', 'updated_at']
  actions = ['make_draft','make_published']

  def get_queryset(self, request):
    qs = super().get_queryset(request)
    return qs.prefetch_related('tag_set')

  def tag_list(request, post):
    return ', '.join(tag.name for tag in post.tag_set.all()) # list comprehension

  def content_size(self, post):
    return mark_safe('<strong>{}글자</strong>'.format(len(post.content)))
  content_size.short_description = '글자수'

  def make_draft(self, request, queryset):
    updated_count = queryset.update(status='d') #QuerySet.update
    self.message_user(request, '{}건의 포스팅을 Draft 상태로 변경'.format(updated_count)) #django message framework 활용
  make_draft.short_description = '지정 포스팅을 Draft 상태로 변경합니다.'

  def make_published(self, request, queryset):
      updated_count = queryset.update(status='p') #QuerySet.update
      self.message_user(request, '{}건의 포스팅을 Published 상태로 변경'.format(updated_count)) #django message framework 활용
  make_published.short_description = '지정 포스팅을 Published 상태로 변경합니다.'
# admin.site.register(Post, PostAdmin)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
  list_display = ['id','author','post_content_len']
  # list_select_related = ['post']

  def post_content_len(self, comment):
    return '{}글자'.format(len(comment.post.content))
  
  def get_queryset(self, request):
    qs = super().get_queryset(request)
    return qs.select_related('post')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
  list_display = ['name']
