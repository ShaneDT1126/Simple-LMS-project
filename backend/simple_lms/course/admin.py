from django.contrib import admin
from .models import Category, Course, Lessons, Comment


admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Lessons)
admin.site.register(Comment)