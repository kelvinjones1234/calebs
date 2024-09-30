from rest_framework import serializers
from payment_app.serializers import DepartmentSerializer, FeeSerializer
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Transaction
    fields = ['matriculation_number', 'first_name', 'level', 'semester', 
              'middle_name', 'last_name', 'email', 'department', 
              'fee', 'amount', 'date', 'paid', 'reference_number']



class GetTransactionSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()  # Serialize Department model fields
    fee = FeeSerializer()  # Serialize Fee model fields

    class Meta:
        model = Transaction
        fields = ['matriculation_number', 'first_name', 
                  'middle_name', 'last_name', 'level', 'semester', 'email', 'department', 
                  'fee', 'amount', 'date', 'paid', 'reference_number']