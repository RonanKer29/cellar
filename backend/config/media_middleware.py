"""
Middleware pour servir les fichiers média en production
"""
import os
from django.http import Http404, HttpResponse
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class MediaServeMiddleware(MiddlewareMixin):
    """
    Middleware pour servir les fichiers média en production via Django
    """
    
    def process_request(self, request):
        """
        Vérifie si la requête concerne un fichier média et le sert si nécessaire
        """
        if not request.path.startswith(settings.MEDIA_URL):
            return None
            
        # Construire le chemin du fichier
        media_path = request.path[len(settings.MEDIA_URL):]
        full_path = os.path.join(settings.MEDIA_ROOT, media_path)
        
        # Vérifier si le fichier existe
        if not os.path.exists(full_path) or not os.path.isfile(full_path):
            raise Http404("Media file not found")
        
        # Servir le fichier
        try:
            with open(full_path, 'rb') as f:
                response = HttpResponse(f.read())
                
            # Déterminer le type de contenu
            if full_path.endswith('.jpg') or full_path.endswith('.jpeg'):
                response['Content-Type'] = 'image/jpeg'
            elif full_path.endswith('.png'):
                response['Content-Type'] = 'image/png'
            elif full_path.endswith('.webp'):
                response['Content-Type'] = 'image/webp'
            else:
                response['Content-Type'] = 'application/octet-stream'
                
            return response
            
        except IOError:
            raise Http404("Error reading media file")