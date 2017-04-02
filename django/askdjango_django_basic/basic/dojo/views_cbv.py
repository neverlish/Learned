import os
from django.conf import settings
from django.views.generic import View, TemplateView
from django.http import HttpResponse, JsonResponse

class PostListView1(View):
  def get(self, request):
    name = '공유'
    html = '''
      <h1>AskDjango</h1>
      <p>{name}</p>
      <p>여러분의 파이썬&장고 페이스메이커가 되어드리겠습니다.</p>
    '''.format(name=name)
    return HttpResponse(html)

post_list1 = PostListView1.as_view()

class PostListView2(TemplateView):
  template_name = 'dojo/post_list.html'

  def get_context_data(self):
    context = super().get_context_data()
    context['name'] = '공유'
    return context

post_list2 = PostListView2.as_view()  

class PostListView3(View):
  def get(self, request):
    return JsonResponse(self.get_data(), json_dumps_params={'ensure_ascii': False})
  
  def get_data(self):
    return {
      'message': '안녕 파이썬 & 장고',
      'items': ['파이썬','장고','Celery','Azure','AWS'],
    }

post_list3 = PostListView3.as_view()  

class ExcelDownload(View):
  excel_path = os.path.join(settings.BASE_DIR, 'gdplev.xls')
  
  def get(self, request):
    filename = os.path.basename(self.excel_path)
    with open(self.excel_path, 'rb') as f:
      response = HttpResponse(f, content_type='application/vnd.ms-excel')
      response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
      return response

excel_download = ExcelDownload.as_view()
