from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Bottle
from .serializers import BottleSerializer

class BottleViewSet(ModelViewSet):
    queryset = Bottle.objects.all()
    serializer_class = BottleSerializer
