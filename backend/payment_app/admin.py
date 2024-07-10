from django.contrib import admin

from .models import Department, Fee

class FeeAdmin(admin.ModelAdmin):
  list_display = ['department', 'fee', 'amount']

admin.site.register(Department)
admin.site.register(Fee, FeeAdmin)