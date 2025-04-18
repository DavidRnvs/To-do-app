from django.shortcuts import render
from .models import User,Tache
from rest_framework import viewsets
from .serializers import TacheSerializer,UserSerializer

class TacheViewSet(viewsets.ModelViewSet):
    queryset = Tache.objects.all()
    serializer_class = TacheSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
