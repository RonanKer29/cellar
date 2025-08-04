# Cave à Vin

Une application web moderne pour gérer sa cave à vin personnelle. Suivez vos bouteilles, organisez votre collection et obtenez des statistiques détaillées sur votre cave.

## ✨ Fonctionnalités

- **Gestion de cave** : Ajout, modification et suppression de bouteilles
- **Organisation avancée** : Filtres par couleur, région, producteur et prix
- **Statistiques détaillées** : Analyses de votre collection avec graphiques
- **Recherche intelligente** : Recherche textuelle multi-critères
- **Gestion d'inventaire** : Suivi des quantités et statuts (en cave/bue)
- **Photos** : Ajout d'images pour vos bouteilles
- **Notes de dégustation** : Évaluations et commentaires personnels

## 🛠️ Technologies

### Backend
- **Django 5.2** - Framework web Python
- **Django REST Framework** - API REST
- **JWT Authentication** - Authentification sécurisée
- **SQLite** - Base de données

### Frontend
- **React 19** - Interface utilisateur
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS utility-first
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes
- **React Router** - Navigation

## 🚀 Installation

### Prérequis
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend API : http://localhost:8000
- Admin Django : http://localhost:8000/admin

## 📚 API Documentation

### Endpoints principaux
- `GET/POST /api/bottles/` - Liste et création de bouteilles
- `GET/PUT/DELETE /api/bottles/{id}/` - Détail, modification, suppression
- `POST /api/token/` - Authentification
- `POST /api/register/` - Inscription
- `GET /api/profile/` - Profil utilisateur

### Authentification
L'API utilise JWT (JSON Web Tokens). Incluez le token dans l'en-tête :
```
Authorization: Bearer <votre-token>
```

## 🏗️ Structure du projet

```
caveavin/
├── backend/                 # API Django
│   ├── caveavin/           # App principale
│   │   ├── models.py       # Modèles de données
│   │   ├── views.py        # Vues API
│   │   ├── serializers.py  # Sérialiseurs
│   │   └── admin.py        # Interface admin
│   └── config/             # Configuration Django
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/          # Pages principales
│   │   ├── services/       # Services API
│   │   ├── hooks/          # Hooks personnalisés
│   │   └── utils/          # Utilitaires
│   └── public/             # Assets statiques
└── README.md
```

## 🎯 Utilisation

1. **Inscription/Connexion** : Créez un compte ou connectez-vous
2. **Ajout de vins** : Utilisez le formulaire pour ajouter vos bouteilles
3. **Organisation** : Utilisez les filtres pour retrouver vos vins
4. **Statistiques** : Consultez l'onglet statistiques pour analyser votre cave
5. **Gestion** : Modifiez les quantités et statuts selon votre consommation

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Pushez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Développeur

Développé avec ❤️ pour les amateurs de vin.