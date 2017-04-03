from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
  list_display = ['id', 'title', 'content_size', 'status', 'created_at', 'updated_at']
  actions = ['make_draft','make_published']

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
