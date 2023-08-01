from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class ToDo(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=300)
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

class Daily(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=300)
    timestamp = models.DateTimeField(auto_now_add=True)

class FinishedDaily(models.Model):
    id = models.BigAutoField(primary_key=True)
    daily = models.ForeignKey(Daily, null=True, blank=True, related_name='daily_item', on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

