from django.contrib import admin
from .models import Transaction

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('matriculation_number', 'first_name', 'middle_name', 'last_name', 'department', 'fee', 'amount', 'email', 'reference_number', 'paid')
    list_filter = ('department', 'fee', )
    readonly_fields = ['matriculation_number', 'fee', 'date', 'amount', 'reference_number']


    fieldsets = (
        ('Student Information', {'fields': ('matriculation_number', 'first_name', 'middle_name', 'last_name', 'department', 'email', 'level', 'semester')}),
        ('Payment Information', {'fields': ('fee', 'amount', 'date', 'paid', 'reference_number')}),
    )

    search_fields = ('reference_number',)

admin.site.register(Transaction, TransactionAdmin)