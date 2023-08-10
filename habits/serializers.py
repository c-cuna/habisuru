from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ("id", "action", "is_done", "timestamp")