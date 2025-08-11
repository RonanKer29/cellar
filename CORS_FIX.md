# 🔧 Solution aux Problèmes CORS - Cave à Vin

## ❌ Erreur Rencontrée
```
Blocage d'une requête multiorigine (Cross-Origin Request) : la politique « Same Origin » 
ne permet pas de consulter la ressource distante située sur http://127.0.0.1:8000/api/token/. 
Raison : échec de la requête CORS. Code d'état : (null).
```

## ✅ Solutions Implémentées

### 1. Configuration CORS Élargie (`backend/config/settings.py`)
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://localhost:5173",
    "https://127.0.0.1:5173",
]

# En développement, autoriser toutes les origines localhost
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
    CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_HEADERS = [
    'accept', 'accept-encoding', 'authorization', 
    'content-type', 'origin', 'user-agent', 'x-csrftoken'
]
```

### 2. CSP Adaptée pour CORS (`backend/config/middleware.py`)
```python
# Content Security Policy adaptée pour le développement
if DEBUG:
    csp_policy += "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*;"
```

### 3. Scripts de Diagnostic et Démarrage

#### 🔍 Diagnostic CORS
```bash
./diagnose_cors.sh
```
- Vérifie si le backend est accessible
- Teste les requêtes CORS OPTIONS
- Affiche les headers CORS
- Propose des solutions

#### 🚀 Démarrage Automatique
```bash
./start_dev.sh
```
- Configure automatiquement les variables d'environnement
- Démarre backend et frontend dans le bon ordre
- Vérifie la disponibilité des services
- Évite les conflits de ports

## 🛠️ Méthodes de Résolution

### Méthode 1 : Démarrage Rapide (Recommandée)
```bash
# Une seule commande pour tout démarrer
./start_dev.sh
```

### Méthode 2 : Démarrage Manuel
```bash
# 1. Backend avec variables d'environnement
cd backend/
export DEBUG=True
export ALLOWED_HOSTS="localhost,127.0.0.1"
python manage.py runserver 127.0.0.1:8000

# 2. Frontend (nouveau terminal)
cd frontend/
npm run dev
```

### Méthode 3 : Diagnostic puis Correction
```bash
# 1. Diagnostiquer le problème
./diagnose_cors.sh

# 2. Appliquer la solution recommandée
```

## 🔧 Variables d'Environnement Importantes

### Backend (.env ou export)
```bash
DEBUG=True                           # Active CORS_ALLOW_ALL_ORIGINS
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## ✅ Vérifications Post-Correction

1. **Backend accessible :**
   ```bash
   curl http://127.0.0.1:8000/api/
   # Doit retourner du JSON sans erreur
   ```

2. **Headers CORS présents :**
   ```bash
   curl -I -H "Origin: http://localhost:5173" \
        -X OPTIONS http://127.0.0.1:8000/api/token/
   # Doit afficher: Access-Control-Allow-Origin: *
   ```

3. **Frontend peut se connecter :**
   - Ouvrir http://localhost:5173
   - Essayer de se connecter
   - Plus d'erreur CORS dans la console

## 🎯 Pourquoi Cette Erreur ?

### Causes Communes
1. **Middleware mal ordonné :** CORS doit être avant Django Security
2. **Origins manquantes :** 127.0.0.1 vs localhost
3. **Headers manquants :** Authorization pas autorisé
4. **CSP trop restrictive :** connect-src bloque les requêtes

### Notre Solution
- ✅ CORS middleware bien positionné
- ✅ Toutes les variantes localhost/127.0.0.1 autorisées
- ✅ Headers Authorization + Content-Type autorisés
- ✅ CSP adaptative (strict en prod, permissive en dev)

## 🚨 Important pour la Production

En production, remplacez :
```python
CORS_ALLOW_ALL_ORIGINS = True  # ❌ Dangereux en prod
```

Par :
```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
```

---

**🎉 Votre problème CORS est maintenant résolu !**