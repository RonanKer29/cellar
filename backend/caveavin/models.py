"""Modèles de données pour l'application Cave à Vin.

Ce module définit les modèles Django pour la gestion de cave à vin.
"""
from django.db import models
from django.contrib.auth.models import User
from .utils import compress_image, get_image_size_mb
from .validators import (
    validate_image_file, 
    validate_wine_year, 
    validate_quantity, 
    validate_price
)


class Bottle(models.Model):
    """Modèle représentant une bouteille de vin dans la cave.
    
    Cette classe gère toutes les informations relatives à une bouteille de vin :
    - Informations viticoles (nom, millésime, producteur, région, cépage)
    - Informations commerciales (prix d'achat, valeur estimée, lieu d'achat)
    - Informations personnelles (notes de dégustation, évaluation, photos)
    - Gestion de l'inventaire (quantité, statut, propriétaire)
    
    Attributes:
        owner (ForeignKey): Propriétaire de la bouteille (User)
        name (CharField): Nom du vin
        year (IntegerField): Millésime
        productor (CharField): Producteur du vin
        country (CharField): Pays d'origine
        region (CharField): Région/Appellation d'origine
        color (CharField): Couleur du vin (Rouge, Blanc, Rosé, Pétillant, Autre)
        grape (CharField): Cépage(s) principal(aux) du vin
        quantity (PositiveIntegerField): Quantité en stock
        status (CharField): Statut (En cave, Bue)
        date_added (DateField): Date d'ajout à la cave
        purchase_date (DateField): Date d'achat de la bouteille
        purchase_place (CharField): Lieu d'achat
        price (DecimalField): Prix d'achat en euros
        estimated_value (DecimalField): Valeur estimée actuelle en euros
        description (TextField): Description générale et notes
        tasting_note (TextField): Notes de dégustation détaillées
        rating (PositiveIntegerField): Note personnelle sur 5
        image (ImageField): Photo de la bouteille
    """
    # Propriétaire de la bouteille - null=True temporairement pour la migration
    owner = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='bottles', 
        null=True, 
        blank=True,
        verbose_name="Propriétaire",
        help_text="Utilisateur propriétaire de cette bouteille"
    )
    
    # Constantes pour les choix de couleur
    RED = 'Rouge'
    WHITE = 'Blanc'
    ROSE = 'Rosé'
    SPARKLING = 'Pétillant'
    OTHER = 'Autre'

    COLOR_CHOICES = [
        (RED, 'Rouge'),
        (WHITE, 'Blanc'),
        (ROSE, 'Rosé'),
        (SPARKLING, 'Pétillant'),
        (OTHER, 'Autre'),
    ]

    IN_CELLAR = 'En cave'
    DRUNK = 'Bue'
    STATUS_CHOICES = [
        (IN_CELLAR, 'En cave'),
        (DRUNK, 'Bue'),
    ]

    name = models.CharField("Nom du vin", max_length=200)
    year = models.IntegerField("Millésime", validators=[validate_wine_year])
    productor = models.CharField("Producteur", max_length=100)
    country = models.CharField("Pays", max_length=50)
    region = models.CharField("Région/Appellation", max_length=100, blank=True, null=True)
    color = models.CharField("Couleur", max_length=20, choices=COLOR_CHOICES, default=RED)
    grape = models.CharField("Cépage(s)", max_length=100, blank=True, null=True)
    quantity = models.PositiveIntegerField("Quantité", default=1, validators=[validate_quantity])
    status = models.CharField("Statut", max_length=20, choices=STATUS_CHOICES, default=IN_CELLAR)
    date_added = models.DateField("Date d'ajout", auto_now_add=True)
    purchase_date = models.DateField("Date d'achat", blank=True, null=True)
    purchase_place = models.CharField("Lieu d'achat", max_length=150, blank=True, null=True)
    price = models.DecimalField("Prix d'achat (€)", max_digits=7, decimal_places=2, blank=True, null=True, validators=[validate_price])
    estimated_value = models.DecimalField("Valeur estimée (€)", max_digits=7, decimal_places=2, blank=True, null=True)
    description = models.TextField("Description / Notes", blank=True, null=True)
    tasting_note = models.TextField("Note de dégustation", blank=True, null=True)
    rating = models.PositiveIntegerField("Note (sur 5)", blank=True, null=True)
    image = models.ImageField("Photo de la bouteille", upload_to='bottles/', blank=True, null=True, validators=[validate_image_file])

    def __str__(self):
        """Représentation textuelle de la bouteille.
        
        Returns:
            str: Nom du vin suivi du millésime entre parenthèses
        """
        return f"{self.name} ({self.year})"
    
    class Meta:
        """Métadonnées du modèle Bottle."""
        verbose_name = "Bouteille"
        verbose_name_plural = "Bouteilles"
        ordering = ['-date_added', 'name']
        
    def get_age(self):
        """Calcule l'âge du vin en années.
        
        Returns:
            int: Nombre d'années depuis le millésime
        """
        from datetime import datetime
        return datetime.now().year - self.year
    
    def is_drinkable(self):
        """Vérifie si la bouteille est disponible pour dégustation.
        
        Returns:
            bool: True si la bouteille est en cave et en stock
        """
        return self.status == self.IN_CELLAR and self.quantity > 0
    
    def total_value(self):
        """Calcule la valeur totale basée sur la quantité.
        
        Returns:
            Decimal: Valeur estimée multipliée par la quantité
        """
        if self.estimated_value and self.quantity:
            return self.estimated_value * self.quantity
        return None
    
    def save(self, *args, **kwargs):
        """Override save pour compresser l'image automatiquement."""
        if self.image:
            # Vérifier la taille de l'image
            image_size_mb = get_image_size_mb(self.image)
            
            # Compresser si l'image fait plus de 1MB
            if image_size_mb > 1.0:
                self.image = compress_image(
                    self.image,
                    max_width=800,
                    max_height=600,
                    quality=85
                )
        
        super().save(*args, **kwargs)
