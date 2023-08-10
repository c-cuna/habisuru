from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ToDo
from .serializers import ToDoSerializer

class ToDoViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()

    @action(detail=False, methods=['DELETE'])
    def delete_all(self, request):
        ToDo.objects.all().delete()
        return Response('success')