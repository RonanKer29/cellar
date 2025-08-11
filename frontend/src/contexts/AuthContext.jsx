/**
 * Contexte d'authentification pour l'application Cave à Vin
 * 
 * Gère l'état global d'authentification de l'application avec :
 * - Connexion/déconnexion des utilisateurs
 * - Enregistrement de nouveaux comptes
 * - Gestion automatique des tokens JWT
 * - Persistance de la session utilisateur
 * - Rafraîchissement automatique des données utilisateur
 * 
 * @module AuthContext
 * @requires React
 * @requires apiService
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

/**
 * Contexte React pour l'authentification
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * 
 * Doit être utilisé uniquement dans des composants enfants d'AuthProvider.
 * Fournit accès à toutes les fonctions et états d'authentification.
 * 
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 * @returns {Object} Contexte d'authentification complet
 * @returns {Object|null} returns.user - Données de l'utilisateur connecté
 * @returns {boolean} returns.isAuthenticated - Statut d'authentification
 * @returns {boolean} returns.isLoading - Chargement initial
 * @returns {Function} returns.login - Fonction de connexion
 * @returns {Function} returns.register - Fonction d'enregistrement
 * @returns {Function} returns.logout - Fonction de déconnexion
 * @returns {Function} returns.refreshToken - Rafraîchissement du token
 * @returns {Function} returns.refreshUserData - Rafraîchissement des données utilisateur
 * 
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Fournisseur de contexte d'authentification
 * 
 * Composant wrapper qui fournit l'état d'authentification à tous ses enfants.
 * Gère la logique métier de l'authentification et maintient la session utilisateur.
 * 
 * @param {Object} props - Props du composant
 * @param {React.ReactNode} props.children - Composants enfants
 * @returns {JSX.Element} Provider avec contexte d'authentification
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Vérifie si la session a expiré (2 jours d'inactivité)
   * 
   * @returns {boolean} true si la session a expiré
   */
  const isSessionExpired = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return true;
    
    const currentTime = new Date().getTime();
    const sessionDuration = 2 * 24 * 60 * 60 * 1000; // 2 jours en millisecondes
    
    return (currentTime - parseInt(loginTime)) > sessionDuration;
  };

  /**
   * Vérifie le statut d'authentification au chargement de l'application
   * 
   * Tente de récupérer les données utilisateur avec le token stocké.
   * En cas d'échec, effectue une déconnexion automatique.
   * 
   * @private
   */
  const checkAuthStatus = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Vérifier si la session a expiré
    if (isSessionExpired()) {
      logout();
      setIsLoading(false);
      return;
    }

    try {
      // Get user profile data to verify token and get user info
      const userData = await apiService.getUserProfile();
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error) {
      // Token is invalid or expired
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Connecte un utilisateur avec ses identifiants
   * 
   * Effectue l'authentification auprès de l'API et stocke les tokens JWT.
   * Récupère automatiquement les données du profil utilisateur.
   * 
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} Résultat de la connexion
   * @returns {boolean} returns.success - Succès de la connexion
   * @returns {string} [returns.error] - Message d'erreur si échec
   */
  const login = async (username, password) => {
    try {
      const response = await fetch(`${apiService.baseURL}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('loginTime', new Date().getTime().toString());
        setIsAuthenticated(true);
        
        // Get user profile data after successful login
        try {
          const userData = await apiService.getUserProfile();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser({ username });
        }
        
        return { success: true };
      } else {
        return { success: false, error: 'Identifiants incorrects' };
      }
    } catch (error) {
      return { success: false, error: 'Erreur serveur' };
    }
  };

  /**
   * Enregistre un nouvel utilisateur
   * 
   * Crée un nouveau compte utilisateur avec les données fournies.
   * N'effectue pas de connexion automatique après l'enregistrement.
   * 
   * @param {Object} userData - Données du nouvel utilisateur
   * @param {string} userData.username - Nom d'utilisateur
   * @param {string} userData.email - Adresse email
   * @param {string} userData.password - Mot de passe
   * @param {string} userData.password_confirm - Confirmation du mot de passe
   * @param {string} [userData.first_name] - Prénom
   * @param {string} [userData.last_name] - Nom de famille
   * @returns {Promise<Object>} Résultat de l'enregistrement
   * @returns {boolean} returns.success - Succès de l'enregistrement
   * @returns {string} [returns.message] - Message de succès
   * @returns {Object} [returns.errors] - Erreurs de validation
   * @returns {string} [returns.error] - Erreur serveur
   */
  const register = async (userData) => {
    try {
      const response = await fetch(`${apiService.baseURL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, errors: data };
      }
    } catch (error) {
      return { success: false, error: 'Erreur serveur' };
    }
  };

  /**
   * Déconnecte l'utilisateur actuel
   * 
   * Supprime les tokens du stockage local et remet à zéro l'état d'authentification.
   * Redirige vers la page d'accueil (landing page).
   * Peut être appelée manuellement ou automatiquement en cas de token expiré.
   */
  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('loginTime');
    setIsAuthenticated(false);
    setUser(null);
    // Rediriger vers la page d'accueil au lieu de /login
    navigate('/');
  };

  /**
   * Rafraîchit le token d'accès JWT
   * 
   * Utilise le refresh token pour obtenir un nouveau token d'accès.
   * En cas d'échec, effectue une déconnexion automatique.
   * 
   * @returns {Promise<boolean>} true si le rafraîchissement a réussi
   */
  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return false;

    try {
      const response = await fetch(`${apiService.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('access', data.access);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  };

  /**
   * Rafraîchit les données du profil utilisateur
   * 
   * Récupère les dernières données utilisateur depuis l'API.
   * Utile après des modifications de profil ou pour synchroniser les statistiques.
   * 
   * @returns {Promise<Object|null>} Données utilisateur mises à jour ou null en cas d'erreur
   */
  const refreshUserData = async () => {
    try {
      const userData = await apiService.getUserProfile();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return null;
    }
  };

  useEffect(() => {
    checkAuthStatus();

    // Vérifier l'expiration de session toutes les 5 minutes
    const intervalId = setInterval(() => {
      if (isAuthenticated && isSessionExpired()) {
        console.log('Session expired - logging out');
        logout();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  // Valeur du contexte exposée aux composants enfants
  const value = {
    user,                // Données de l'utilisateur connecté
    isAuthenticated,     // Statut d'authentification
    isLoading,          // Indicateur de chargement initial
    login,              // Fonction de connexion
    register,           // Fonction d'enregistrement
    logout,             // Fonction de déconnexion
    refreshToken,       // Rafraîchissement du token
    refreshUserData,    // Rafraîchissement des données utilisateur
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};