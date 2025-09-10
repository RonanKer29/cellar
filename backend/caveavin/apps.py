"""Configuration de l'application Cave à Vin...

Ce module contient la configuration Django pour l'application caveavin.
"""
from django.apps import AppConfig


class CaveavinConfig(AppConfig):
    """Configuration de l'application caveavin.

    Définit les paramètres de base de l'application Django pour la gestion
    de cave à vin, incluant le type de clé primaire par défaut et le nom de l'app.

    Attributes:
        default_auto_field: Type de champ auto-incrémenté par défaut
        name: Nom de l'application Django
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'caveavin'
    verbose_name = 'Cave à Vin'
