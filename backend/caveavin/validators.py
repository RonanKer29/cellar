"""
Validateurs personnalisés pour l'application Cave à Vin
"""
import os
from django.core.exceptions import ValidationError
from django.conf import settings
from PIL import Image

try:
    import magic
    MAGIC_AVAILABLE = True
except ImportError:
    MAGIC_AVAILABLE = False


def validate_image_file(file):
    """
    Valide qu'un fichier uploadé est bien une image sécurisée
    
    Args:
        file: Le fichier uploadé
        
    Raises:
        ValidationError: Si le fichier n'est pas valide
    """
    # Vérifier la taille du fichier (max 5MB)
    max_size = 5 * 1024 * 1024  # 5MB en bytes
    if file.size > max_size:
        raise ValidationError(f'Le fichier est trop volumineux. Taille maximum: {max_size // (1024*1024)}MB')
    
    # Vérifier l'extension du fichier
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    file_extension = os.path.splitext(file.name)[1].lower()
    if file_extension not in allowed_extensions:
        raise ValidationError(f'Extension de fichier non autorisée. Extensions acceptées: {", ".join(allowed_extensions)}')
    
    # Vérifier le type MIME avec python-magic (si disponible)
    if MAGIC_AVAILABLE:
        try:
            file_mime = magic.from_buffer(file.read(1024), mime=True)
            allowed_mimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            if file_mime not in allowed_mimes:
                raise ValidationError(f'Type de fichier non autorisé: {file_mime}')
        except Exception as e:
            raise ValidationError(f'Erreur lors de la validation du fichier: {str(e)}')
        
        # Reset file pointer après lecture
        file.seek(0)
    
    # Valider l'image avec Pillow pour détecter les images corrompues
    try:
        image = Image.open(file)
        image.verify()  # Vérifie que l'image n'est pas corrompue
    except Exception as e:
        raise ValidationError('Le fichier image est corrompu ou invalide')
    
    # Reset file pointer après vérification
    file.seek(0)
    
    # Vérifier les dimensions (optionnel)
    try:
        image = Image.open(file)
        width, height = image.size
        max_dimension = 4000  # 4000px max
        if width > max_dimension or height > max_dimension:
            raise ValidationError(f'Image trop grande. Dimensions maximum: {max_dimension}x{max_dimension}px')
    except Exception as e:
        raise ValidationError('Impossible de lire les dimensions de l\'image')
    
    # Reset file pointer final
    file.seek(0)


def validate_wine_year(year):
    """
    Valide que l'année du vin est réaliste
    
    Args:
        year: L'année à valider
        
    Raises:
        ValidationError: Si l'année n'est pas valide
    """
    import datetime
    current_year = datetime.datetime.now().year
    
    if year < 1800:
        raise ValidationError('L\'année ne peut pas être antérieure à 1800')
    
    if year > current_year + 1:
        raise ValidationError(f'L\'année ne peut pas être supérieure à {current_year + 1}')


def validate_quantity(quantity):
    """
    Valide la quantité de bouteilles
    
    Args:
        quantity: La quantité à valider
        
    Raises:
        ValidationError: Si la quantité n'est pas valide
    """
    if quantity < 0:
        raise ValidationError('La quantité ne peut pas être négative')
    
    if quantity > 1000:
        raise ValidationError('Quantité trop élevée (maximum 1000 bouteilles)')


def validate_price(price):
    """
    Valide le prix d'une bouteille
    
    Args:
        price: Le prix à valider
        
    Raises:
        ValidationError: Si le prix n'est pas valide
    """
    if price < 0:
        raise ValidationError('Le prix ne peut pas être négatif')
    
    if price > 50000:
        raise ValidationError('Prix trop élevé (maximum 50,000€)')


def validate_rating(rating):
    """
    Valide la note d'une bouteille (sur 5)
    
    Args:
        rating: La note à valider
        
    Raises:
        ValidationError: Si la note n'est pas valide
    """
    if rating < 1:
        raise ValidationError('La note ne peut pas être inférieure à 1')
    
    if rating > 5:
        raise ValidationError('La note ne peut pas être supérieure à 5')