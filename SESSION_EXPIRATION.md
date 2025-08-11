# Système d'Expiration de Session

## Vue d'ensemble

Le système d'authentification de Cave à Vin inclut maintenant un mécanisme d'expiration de session pour améliorer la sécurité. Les utilisateurs seront automatiquement déconnectés après une période d'inactivité.

## Configuration

### Durée d'expiration de session
- **Durée totale** : 2 jours (48 heures)
- **Vérification automatique** : Toutes les 5 minutes
- **Vérification à chaque requête API** : Oui

### Paramètres JWT
- **Token d'accès** : 15 minutes (au lieu de 60)
- **Token de refresh** : 6 heures (au lieu de 7 jours)

## Comment ça fonctionne

1. **À la connexion** : Un timestamp est enregistré dans `localStorage` sous la clé `loginTime`
2. **Vérifications automatiques** :
   - Au chargement de l'application
   - Toutes les 5 minutes via un `setInterval`
   - Avant chaque requête API
3. **Déconnexion automatique** : Si plus de 48h se sont écoulées depuis la connexion

## Fichiers modifiés

### Frontend
- `src/contexts/AuthContext.jsx` : Logique principale d'expiration
- `src/services/api.js` : Vérification avant chaque requête
- `src/utils/sessionDebug.js` : Utilitaires de debug (développement)

### Backend
- `backend/config/settings.py` : Paramètres JWT pour développement
- `backend/config/settings_prod.py` : Paramètres JWT pour production

## Utilitaires de développement

En mode développement, des utilitaires sont disponibles dans la console du navigateur :

```javascript
// Simuler une session expirée
window.sessionDebug.simulateExpiredSession(3); // 3 jours dans le passé

// Voir les infos de session
window.sessionDebug.getSessionInfo();

// Réinitialiser le timer de session
window.sessionDebug.resetSessionTimer();
```

## Test de la fonctionnalité

1. Connectez-vous à l'application
2. Dans la console du navigateur, tapez : `window.sessionDebug.simulateExpiredSession(3)`
3. Naviguez dans l'application ou attendez 5 minutes
4. Vous devriez être automatiquement déconnecté

## Impact utilisateur

- Les utilisateurs devront se reconnecter après 2 jours d'inactivité
- La déconnexion se fait automatiquement sans perte de données
- Redirection vers la page d'accueil lors de la déconnexion