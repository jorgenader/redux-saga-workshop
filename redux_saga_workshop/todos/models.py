from django.db import models

from accounts.models import User


class Todo(models.Model):
    text = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User)
