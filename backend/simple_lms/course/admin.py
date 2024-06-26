from django.contrib import admin
from .models import Category, Course, Lessons


admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Lessons)