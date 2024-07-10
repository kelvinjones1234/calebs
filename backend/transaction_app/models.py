from django.db import models
from payment_app .models import Department, Fee

class Transaction(models.Model):
  matriculation_number = models.CharField(max_length=20)
  first_name = models.CharField(max_length=50)
  middle_name = models.CharField(max_length=50, blank=True, null=True)
  last_name = models.CharField(max_length=50)
  email = models.EmailField()
  department = models.ForeignKey(Department, on_delete=models.CASCADE)
  fee = models.ForeignKey(Fee, on_delete=models.CASCADE)
  amount = models.CharField(max_length=50)
  date = models.DateTimeField(auto_now_add=True)
  paid = models.BooleanField(default=False)
  reference_number = models.CharField(max_length=50)

  def __str__(self):
    return f'{self.first_name} {self.middle_name} {self.last_name}' 

