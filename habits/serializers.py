from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import ToDo, Daily, FinishedDaily

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ("id", "user", "action", "is_read", "timestamp")

class DailySerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily
        fields = ("id", "user", "action", "timestamp")

class FinishedDailySerializer(serializers.ModelSerializer):
    class Meta:
        model = FinishedDaily
        fields = ("id", "daily", "is_done", "timestamp")