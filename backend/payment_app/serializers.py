from rest_framework import serializers
from .models import Department, Fee

class DepartmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Department
    fields = '__all__'


class FeeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Fee
    fields = '__all__'