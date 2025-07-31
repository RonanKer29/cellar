from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from caveavin.views import BottleViewSet


router = DefaultRouter()
router.register(r"bottles", BottleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]



urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
