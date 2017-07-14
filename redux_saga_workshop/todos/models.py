from django.db import models

from accounts.models import User


class Todo(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    user = models.ForeignKey(User)
