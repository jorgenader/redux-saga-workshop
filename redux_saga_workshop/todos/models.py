from django.db import models


class Todo(models.Model):
    text = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
