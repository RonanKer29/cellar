"""
Middlewares de sécurité personnalisés pour Cave à Vin
"""
from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin
import time
from collections import defaultdict


class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    Ajoute des en-têtes de sécurité à toutes les réponses
    Compatible avec CORS - s'exécute APRÈS le middleware CORS
    """
    def process_response(self, request, response):
        # Ne pas écraser les headers CORS déjà définis
        # Content Security Policy adaptée pour le développement
        from django.conf import settings
        
        if getattr(settings, 'DEBUG', False):
            # CSP permissive en développement pour ne pas bloquer CORS
            csp_policy = (
                "default-src 'self' 'unsafe-inline'; "
                "img-src 'self' data: blob: https:; "
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                "font-src 'self' https://fonts.gstatic.com; "
                "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*; "
                "frame-ancestors 'none'; "
                "base-uri 'self';"
            )
        else:
            # CSP stricte en production
            csp_policy = (
                "default-src 'self'; "
                "img-src 'self' data: blob: https:; "
                "script-src 'self'; "
                "style-src 'self' https://fonts.googleapis.com; "
                "font-src 'self' https://fonts.gstatic.com; "
                "connect-src 'self'; "
                "frame-ancestors 'none'; "
                "base-uri 'self'; "
                "form-action 'self';"
            )
        
        response['Content-Security-Policy'] = csp_policy
        
        # Autres en-têtes de sécurité
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Permissions-Policy'] = (
            'camera=(), '
            'microphone=(), '
            'geolocation=(), '
            'payment=(), '
            'usb=(), '
            'bluetooth=()'
        )
        
        return response


class RateLimitMiddleware(MiddlewareMixin):
    """
    Middleware de limitation de débit simple
    """
    def __init__(self, get_response):
        super().__init__(get_response)
        self.requests = defaultdict(list)
        self.max_requests = 100  # Requests par fenêtre
        self.time_window = 300   # 5 minutes en secondes
        
    def process_request(self, request):
        # Obtenir l'IP du client
        ip = self.get_client_ip(request)
        current_time = time.time()
        
        # Nettoyer les anciennes requêtes
        self.requests[ip] = [
            req_time for req_time in self.requests[ip] 
            if current_time - req_time < self.time_window
        ]
        
        # Vérifier la limite
        if len(self.requests[ip]) >= self.max_requests:
            return HttpResponse(
                'Rate limit exceeded. Too many requests.',
                status=429,
                content_type='text/plain'
            )
        
        # Enregistrer cette requête
        self.requests[ip].append(current_time)
        
        return None
    
    def get_client_ip(self, request):
        """Obtenir l'IP réelle du client (avec support proxy)"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class APIRateLimitMiddleware(MiddlewareMixin):
    """
    Middleware de limitation spécifique pour l'API - Compatible CORS
    """
    def __init__(self, get_response):
        super().__init__(get_response)
        self.api_requests = defaultdict(list)
        self.api_max_requests = 120  # 120 requêtes par minute pour l'API
        self.api_time_window = 60    # 1 minute
        
    def process_request(self, request):
        # Appliquer seulement aux endpoints API, mais PAS aux requêtes OPTIONS (CORS preflight)
        if not request.path.startswith('/api/') or request.method == 'OPTIONS':
            return None
            
        ip = self.get_client_ip(request)
        current_time = time.time()
        
        # Nettoyer les anciennes requêtes
        self.api_requests[ip] = [
            req_time for req_time in self.api_requests[ip] 
            if current_time - req_time < self.api_time_window
        ]
        
        # Vérifier la limite API
        if len(self.api_requests[ip]) >= self.api_max_requests:
            response = HttpResponse(
                '{"error": "API rate limit exceeded"}',
                status=429,
                content_type='application/json'
            )
            # Ajouter les headers CORS même en cas de rate limit
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            return response
        
        # Enregistrer cette requête API
        self.api_requests[ip].append(current_time)
        
        return None
    
    def get_client_ip(self, request):
        """Obtenir l'IP réelle du client"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
        return ip