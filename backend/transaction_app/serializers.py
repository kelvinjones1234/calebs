from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Transaction
    fields = ['matriculation_number', 'first_name', 
              'middle_name', 'last_name', 'email', 'department', 
              'fee', 'amount', 'date', 'paid', 'reference_number']