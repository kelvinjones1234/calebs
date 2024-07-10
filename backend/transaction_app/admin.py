from django.contrib import admin
from .models import Transaction

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('matriculation_number', 'first_name', 'middle_name', 'last_name', 'department', 'fee', 'amount', 'email', 'reference_number', 'paid')
    list_filter = ('matriculation_number', 'fee', 'reference_number', 'paid',)
    readonly_fields = ['matriculation_number', 'fee', 'date', 'amount']


    fieldsets = (
        ('Student Information', {'fields': ('matriculation_number', 'first_name', 'middle_name', 'last_name', 'department', 'email')}),
        ('Payment Information', {'fields': ('fee', 'amount', 'date', 'paid')}),
    )

admin.site.register(Transaction, TransactionAdmin)