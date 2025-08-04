"""Configuration de l'interface d'administration Django pour Cave à Vin.

Ce module configure l'interface d'administration pour le modèle Bottle,
permettant aux administrateurs de gérer les bouteilles via l'interface web Django.
"""
from django.contrib import admin
from .models import Bottle


@admin.register(Bottle)
class BottleAdmin(admin.ModelAdmin):
    """Configuration de l'administration pour le modèle Bottle.
    
    Fournit une interface d'administration complète pour gérer les bouteilles :
    - Affichage en liste avec colonnes principales
    - Filtres par couleur, statut et région
    - Recherche par nom, producteur et région
    - Organisation des champs en sections logiques
    
    Attributes:
        list_display: Colonnes affichées dans la liste
        list_filter: Filtres disponibles dans la barre latérale
        search_fields: Champs inclus dans la recherche
        fieldsets: Organisation des champs en sections
        readonly_fields: Champs en lecture seule
    """
    list_display = ('name', 'year', 'productor', 'color', 'region', 'status', 'quantity', 'owner')
    list_filter = ('color', 'status', 'region', 'country', 'date_added')
    search_fields = ('name', 'productor', 'region', 'grape')
    list_per_page = 25
    date_hierarchy = 'date_added'
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('owner', 'name', 'year', 'productor')
        }),
        ('Caractéristiques viticoles', {
            'fields': ('color', 'grape', 'country', 'region'),
            'classes': ('collapse',)
        }),
        ('Inventaire', {
            'fields': ('quantity', 'status'),
        }),
        ('Informations commerciales', {
            'fields': ('purchase_date', 'purchase_place', 'price', 'estimated_value'),
            'classes': ('collapse',)
        }),
        ('Notes et évaluation', {
            'fields': ('description', 'tasting_note', 'rating', 'image'),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('date_added',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('date_added',)
    
    def get_queryset(self, request):
        """Optimise les requêtes avec select_related pour éviter les N+1.
        
        Args:
            request: Requête HTTP de l'admin
            
        Returns:
            QuerySet: QuerySet optimisé avec les relations pré-chargées
        """
        return super().get_queryset(request).select_related('owner')
