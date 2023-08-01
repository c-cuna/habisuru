from django.shortcuts import render
from rest_framework import viewsets
from .models import ToDo, Daily, FinishedDaily
from .serializers import ToDoSerializer, DailySerializer, FinishedDailySerializer

class ToDoViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()

class DailyViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = Daily.objects.all()

class FinishedDailyViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = FinishedDaily.objects.all()