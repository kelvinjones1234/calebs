from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('username', 'first_name', 'last_name', 'department', 'is_staff', 'is_superuser', 'is_active')
    list_filter = ('is_staff', 'is_active', 'department')
    list_editable = ('is_active',)  
    fieldsets = (
        ('Authentication Information', {'fields': ('username', 'password')}),
        ('Personal Information', {'fields': ('first_name', 'middle_name', 'last_name', 'department')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Dates', {'fields': ('last_login', )}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'first_name', 'last_name', 'department', 'password1', 'password2', 'is_staff', 'is_superuser', 'is_active'),
        }),
    )
    search_fields = ('username', 'first_name', 'last_name')
    ordering = ('username',)

admin.site.register(User, UserAdmin)
