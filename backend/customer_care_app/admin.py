from django.contrib import admin
from .models import Complain

class ComplainAdmin(admin.ModelAdmin):
  list_display = ['email', 'complain']
  readonly_fields = ['email', 'complain']

admin.site.register(Complain, ComplainAdmin)