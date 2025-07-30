from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from caveavin.views import BottleViewSet

# ✅ Déclare le router ici
router = DefaultRouter()
router.register(r"bottles", BottleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
