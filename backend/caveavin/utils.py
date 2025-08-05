"""
Utilitaires pour l'application Cave à Vin
"""
import os
from PIL import Image
from django.core.files.base import ContentFile
from io import BytesIO


def compress_image(image_file, max_width=800, max_height=600, quality=85):
    """
    Compresse et redimensionne une image uploadée
    
    Args:
        image_file: Fichier image Django
        max_width: Largeur maximale en pixels
        max_height: Hauteur maximale en pixels  
        quality: Qualité JPEG (1-100)
    
    Returns:
        ContentFile: Image compressée
    """
    # Ouvrir l'image avec Pillow
    img = Image.open(image_file)
    
    # Convertir en RGB si nécessaire (pour les PNG avec transparence)
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
        img = background
    
    # Calculer les nouvelles dimensions en gardant le ratio
    img_width, img_height = img.size
    ratio = min(max_width / img_width, max_height / img_height)
    
    if ratio < 1:  # Seulement si l'image est plus grande que les limites
        new_width = int(img_width * ratio)
        new_height = int(img_height * ratio)
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Sauvegarder dans un buffer
    buffer = BytesIO()
    img.save(buffer, format='JPEG', quality=quality, optimize=True)
    buffer.seek(0)
    
    # Générer un nouveau nom de fichier
    name, ext = os.path.splitext(image_file.name)
    new_name = f"{name}_compressed.jpg"
    
    return ContentFile(buffer.read(), name=new_name)


def get_image_size_mb(image_file):
    """
    Retourne la taille d'un fichier image en MB
    
    Args:
        image_file: Fichier image Django
        
    Returns:
        float: Taille en MB
    """
    return image_file.size / (1024 * 1024)