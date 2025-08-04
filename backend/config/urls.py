"""Configuration des URLs pour l'application Cave à Vin.

Ce module définit le routage principal de l'application Django :
- Interface d'administration Django
- API REST pour les bouteilles (CRUD complet)
- Endpoints d'authentification JWT
- Gestion des fichiers média (images de bouteilles)

Routes API :
- /api/bottles/ : Gestion des bouteilles (GET, POST, PUT, DELETE)
- /api/token/ : Obtention du token JWT
- /api/token/refresh/ : Rafraîchissement du token
- /api/register/ : Enregistrement utilisateur
- /api/profile/ : Profil utilisateur
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from caveavin.views import BottleViewSet, register_user, get_user_profile

# Import des vues JWT pour l'authentification
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Configuration du routeur API REST
router = DefaultRouter()
router.register(r"bottles", BottleViewSet, basename='bottle')

# Définition des patterns d'URLs
urlpatterns = [
    # Interface d'administration Django
    path('admin/', admin.site.urls),
    
    # API REST pour les bouteilles
    path('api/', include(router.urls)),
    
    # Endpoints d'authentification JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Endpoints de gestion utilisateur
    path('api/register/', register_user, name='register'),
    path('api/profile/', get_user_profile, name='user_profile'),
]

# Ajout du service des fichiers média en mode développement
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
