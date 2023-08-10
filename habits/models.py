from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class ToDo(models.Model):
    id = models.BigAutoField(primary_key=True)
    action = models.CharField(max_length=300)
    is_done = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
