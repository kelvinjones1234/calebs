from django.db import models
from user_app .models import User

class Complain(models.Model):
  email = models.ForeignKey(User, on_delete=models.CASCADE)
  complain = models.TextField()

  def __str__(self):
    return self.email.email
