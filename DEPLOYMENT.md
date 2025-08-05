# CaveAVin - Guide de déploiement Production

Ce guide vous aide à déployer votre application CaveAVin en production sur Railway (backend) et Vercel (frontend) tout en gardant votre environnement de développement intact.

## 📋 Prérequis

- Compte [Railway](https://railway.app)
- Compte [Vercel](https://vercel.com)
- Git configuré avec votre projet

## 🚀 Déploiement Backend (Railway)

### 1. Préparer la base de données

Railway va créer automatiquement une base de données PostgreSQL pour vous.

### 2. Déployer sur Railway

1. **Connecter votre repository :**

   - Allez sur [Railway](https://railway.app)
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez votre repository `caveavin`

2. **Configurer les variables d'environnement :**

   ```bash
   # Variables obligatoires
   DJANGO_SETTINGS_MODULE=config.settings_prod
   SECRET_KEY=votre-clé-secrète-très-longue-et-complexe

   # Base de données (Railway les configure automatiquement)
   DATABASE_URL=postgresql://...  # Fourni par Railway

   # Frontend (sera configuré après déploiement Vercel)
   FRONTEND_URL=https://votre-app.vercel.app

   # Optionnel : Email
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=votre-email@gmail.com
   EMAIL_HOST_PASSWORD=votre-mot-de-passe-app
   DEFAULT_FROM_EMAIL=noreply@caveavin.com

   # Optionnel : Redis (pour le cache)
   REDIS_URL=redis://...  # Si vous ajoutez Redis
   ```

3. **Configuration de déploiement :**
   - Railway détecte automatiquement le `nixpacks.toml`
   - Le déploiement utilise automatiquement `settings_prod.py`
   - Les migrations s'exécutent automatiquement

### 3. Noter l'URL de votre backend

Une fois déployé, Railway vous donne une URL comme : `https://caveavin-production.railway.app`

## 🌐 Déploiement Frontend (Vercel)

### 1. Préparer la configuration

Créez un fichier `.env.production` dans le dossier `frontend` :

```bash
VITE_API_BASE_URL=https://votre-backend.railway.app/api
```

### 2. Déployer sur Vercel

1. **Connecter votre repository :**

   - Allez sur [Vercel](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub

2. **Configuration du projet :**

   - **Framework Preset :** Vite
   - **Root Directory :** `frontend`
   - **Build Command :** `npm run build`
   - **Output Directory :** `dist`

3. **Variables d'environnement :**
   ```bash
   VITE_API_BASE_URL=https://votre-backend.railway.app/api
   ```

### 3. Mettre à jour les CORS sur Railway

Retournez sur Railway et ajoutez l'URL Vercel aux variables d'environnement :

```bash
FRONTEND_URL=https://votre-app.vercel.app
```

## 🔧 Configuration finale

### 1. Tester la connexion

- Visitez votre app Vercel
- Essayez de vous connecter/créer un compte
- Vérifiez que les données se synchronisent

### 2. Configuration des domaines (optionnel)

Si vous avez un domaine personnalisé :

- **Vercel :** Ajoutez votre domaine dans les paramètres
- **Railway :** Ajoutez votre domaine backend dans `ALLOWED_HOSTS`

## 🛠️ Développement local (inchangé)

Votre environnement de développement reste intact :

```bash
# Backend
cd backend
python manage.py runserver  # Utilise settings.py (SQLite)

# Frontend
cd frontend
npm run dev  # Utilise http://127.0.0.1:8000/api
```

## 📊 Monitoring et maintenance

### Logs Railway

- Consultez les logs dans le dashboard Railway
- Surveillez les erreurs et performances

### Vercel Analytics

- Activez Vercel Analytics pour le monitoring frontend
- Surveillez les performances et erreurs

### Migrations

Les migrations se font automatiquement sur Railway à chaque déploiement.

## 🔒 Sécurité Production

✅ **Déjà configuré :**

- DEBUG=False en production
- HTTPS obligatoire
- Cookies sécurisés
- Headers de sécurité
- CORS configuré
- Validation d'entrée

## 🆘 Dépannage

### Erreur 500 Backend

1. Vérifiez les logs Railway
2. Vérifiez les variables d'environnement
3. Vérifiez la connexion DB

### Erreur CORS Frontend

1. Vérifiez `FRONTEND_URL` sur Railway
2. Vérifiez `VITE_API_BASE_URL` sur Vercel

### Base de données

1. Railway gère les sauvegardes automatiquement
2. Pour restaurer : utilisez le dashboard Railway

## 📝 Checklist de déploiement

- [ ] Backend déployé sur Railway
- [ ] Variables d'environnement configurées
- [ ] Base de données PostgreSQL active
- [ ] Frontend déployé sur Vercel
- [ ] CORS configuré correctement
- [ ] Tests de connexion/inscription
- [ ] Domaines personnalisés (si applicable)
- [ ] Monitoring activé

Votre application est maintenant en production ! 🎉
