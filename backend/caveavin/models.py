from django.db import models
from django.contrib.auth.models import User

class Bottle(models.Model):
    # Propriétaire de la bouteille - null=True temporairement pour la migration
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bottles', null=True, blank=True)
    
    # Choix de couleur (menu déroulant)
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
    year = models.IntegerField("Millésime")
    productor = models.CharField("Producteur", max_length=100)
    country = models.CharField("Pays", max_length=50)
    region = models.CharField("Région/Appellation", max_length=100, blank=True, null=True)
    color = models.CharField("Couleur", max_length=20, choices=COLOR_CHOICES, default=RED)
    grape = models.CharField("Cépage(s)", max_length=100, blank=True, null=True)
    quantity = models.PositiveIntegerField("Quantité", default=1)
    status = models.CharField("Statut", max_length=20, choices=STATUS_CHOICES, default=IN_CELLAR)
    date_added = models.DateField("Date d'ajout", auto_now_add=True)
    purchase_date = models.DateField("Date d'achat", blank=True, null=True)
    purchase_place = models.CharField("Lieu d'achat", max_length=150, blank=True, null=True)
    price = models.DecimalField("Prix d'achat (€)", max_digits=7, decimal_places=2, blank=True, null=True)
    estimated_value = models.DecimalField("Valeur estimée (€)", max_digits=7, decimal_places=2, blank=True, null=True)
    description = models.TextField("Description / Notes", blank=True, null=True)
    tasting_note = models.TextField("Note de dégustation", blank=True, null=True)
    rating = models.PositiveIntegerField("Note (sur 5)", blank=True, null=True)
    image = models.ImageField("Photo de la bouteille", upload_to='bottles/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.year})"
