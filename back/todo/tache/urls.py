from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TacheViewSet, UserViewSet

router = DefaultRouter()
router.register(r'tache', TacheViewSet)
router.register(r'user', UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]