"""Vues API pour l'application Cave à Vin.

Ce module contient les vues Django REST Framework pour :
- La gestion CRUD des bouteilles de vin
- L'enregistrement d'utilisateurs
- La récupération des profils utilisateur

Toutes les vues bouteilles nécessitent une authentification et filtrent
automatiquement les données par utilisateur connecté.
"""
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from .models import Bottle
from .serializers import BottleSerializer, UserRegistrationSerializer, UserProfileSerializer


class BottleViewSet(ModelViewSet):
    """ViewSet pour la gestion CRUD des bouteilles de vin.
    
    Fournit les opérations CRUD (Create, Read, Update, Delete) pour les bouteilles.
    Chaque utilisateur ne peut voir et modifier que ses propres bouteilles.
    
    Attributes:
        serializer_class: Sérialiseur utilisé (BottleSerializer)
        permission_classes: Permissions requises (IsAuthenticated)
        
    Methods:
        get_queryset: Filtre les bouteilles par propriétaire
        perform_create: Assigne automatiquement l'utilisateur connecté comme propriétaire
    """
    serializer_class = BottleSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Retourne les bouteilles appartenant à l'utilisateur connecté.
        
        Filtre automatiquement le queryset pour ne retourner que les bouteilles
        dont l'utilisateur connecté est propriétaire.
        
        Returns:
            QuerySet: Bouteilles filtrées par propriétaire
        """
        return Bottle.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        """Sauvegarde une nouvelle bouteille avec l'utilisateur connecté comme propriétaire.
        
        Args:
            serializer (BottleSerializer): Sérialiseur avec les données validées
        """
        serializer.save(owner=self.request.user)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Endpoint d'enregistrement de nouveaux utilisateurs.
    
    Crée un nouveau compte utilisateur avec validation des données.
    Accessible sans authentification pour permettre l'inscription.
    
    Args:
        request (Request): Requête HTTP avec les données utilisateur
        
    Returns:
        Response: Message de succès avec nom d'utilisateur ou erreurs de validation
        
    Status Codes:
        201: Utilisateur créé avec succès
        400: Erreurs de validation des données
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Utilisateur créé avec succès',
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Endpoint de récupération du profil utilisateur.
    
    Retourne les informations de profil de l'utilisateur connecté
    avec statistiques (nombre de bouteilles).
    
    Args:
        request (Request): Requête HTTP authentifiée
        
    Returns:
        Response: Données du profil utilisateur avec statistiques
        
    Status Codes:
        200: Profil récupéré avec succès
        401: Utilisateur non authentifié
    """
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint for deployment platforms.
    
    Returns:
        JsonResponse: Simple health status
    """
    return JsonResponse({'status': 'healthy', 'service': 'caveavin-api'})
