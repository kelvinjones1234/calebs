from django.db import models

class Department(models.Model):
  department = models.CharField(max_length=200)
  date = models.DateField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.department
  
class Fee(models.Model):
  department = models.ForeignKey(Department, on_delete=models.CASCADE)
  fee = models.CharField(max_length=200)
  amount = models.CharField(max_length=200)
  date = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.fee
