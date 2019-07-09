from django.db import models

class Bookmark(models.Model):
    site_name = models.CharField(max_length=100)
    url = models.URLField('Site URL')

    def __str__(self):
        return "이름: " + self.site_name + ", 주소 : " + self.url