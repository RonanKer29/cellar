from django.db import models

class Bottle(models.Model):
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

    # Choix de statut
    IN_CELLAR = 'En cave'
    DRUNK = 'Bue'

    STATUS_CHOICES = [
        (IN_CELLAR, 'En cave'),
        (DRUNK, 'Bue'),
    ]

    name = models.CharField(max_length=200)
    year = models.IntegerField()
    productor = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    region = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default=RED)
    quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=IN_CELLAR)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.year})"
