/**
 * Service API pour l'application Cave à Vin
 * 
 * Fournit une interface centralisée pour toutes les communications avec l'API backend.
 * Gère automatiquement l'authentification JWT, le rafraîchissement des tokens,
 * et la sérialisation des données.
 * 
 * @class ApiService
 * @author Cave à Vin Team
 * @version 1.0.0
 */
import { API_BASE_URL } from "../utils/constants";

class ApiService {
  /**
   * Initialise le service API avec l'URL de base
   * 
   * @param {string} baseURL - URL de base de l'API (par défaut depuis les constantes)
   */
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Vérifie si la session a expiré (2 jours d'inactivité)
   * 
   * @returns {boolean} true si la session a expiré
   */
  isSessionExpired() {
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return true;
    
    const currentTime = new Date().getTime();
    const sessionDuration = 2 * 24 * 60 * 60 * 1000; // 2 jours en millisecondes
    
    return (currentTime - parseInt(loginTime)) > sessionDuration;
  }

  /**
   * Méthode principale pour effectuer des requêtes HTTP vers l'API
   * 
   * Gère automatiquement :
   * - L'ajout du token JWT d'authentification
   * - La sérialisation JSON des données
   * - Le rafraîchissement automatique des tokens expirés
   * - La gestion des erreurs HTTP
   * - La vérification de l'expiration de session
   * 
   * @param {string} endpoint - Point de terminaison de l'API (ex: '/bottles/')
   * @param {Object} options - Options de la requête fetch
   * @param {string} options.method - Méthode HTTP (GET, POST, PUT, DELETE, etc.)
   * @param {Object|FormData} options.body - Corps de la requête
   * @param {Object} options.headers - En-têtes personnalisés
   * @returns {Promise<Object|null>} Réponse JSON parse ou null pour les réponses 204
   * @throws {Error} En cas d'erreur HTTP ou de problème réseau
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    // Vérifier l'expiration de session avant toute requête
    if (this.isSessionExpired()) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('loginTime');
      window.location.href = '/';
      throw new Error('Session expired');
    }

    // Récupérer le token JWT depuis localStorage
    const token = localStorage.getItem("access");

    // Ajoute Authorization si token dispo
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    // Only add Content-Type for JSON, let browser handle FormData
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const config = {
      headers,
      ...options,
    };

    if (
      config.body &&
      typeof config.body === "object" &&
      !(config.body instanceof FormData)
    ) {
      config.body = JSON.stringify(config.body);
    }

    try {
      let response = await fetch(url, config);

      // Handle token refresh for 401 responses
      if (response.status === 401 && token) {
        const refreshSuccessful = await this.refreshToken();
        if (refreshSuccessful) {
          // Retry request with new token
          const newToken = localStorage.getItem("access");
          config.headers.Authorization = `Bearer ${newToken}`;
          response = await fetch(url, config);
        } else {
          // Redirect to login if refresh fails
          window.location.href = '/login';
          throw new Error('Session expired');
        }
      }

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }

      // Attention pour DELETE qui peut ne rien retourner !
      if (response.status === 204) return null;
      return await response.json();
    } catch (error) {
      console.error(`API Request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Rafraîchit le token JWT d'accès
   * 
   * Utilise le refresh token stocké en localStorage pour obtenir un nouveau
   * token d'accès. En cas d'échec, supprime les tokens du stockage local.
   * 
   * @returns {Promise<boolean>} true si le rafraîchissement a réussi, false sinon
   */
  async refreshToken() {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return false;

    try {
      const response = await fetch(`${this.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('access', data.access);
        return true;
      } else {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return false;
    }
  }

  // =====================================
  // ENDPOINTS GESTION DES BOUTEILLES
  // =====================================

  /**
   * Récupère toutes les bouteilles de l'utilisateur connecté
   * 
   * @returns {Promise<Array>} Liste des bouteilles avec leurs détails complets
   * @throws {Error} En cas d'erreur API ou d'authentification
   */
  async getBottles() {
    return this.request("/bottles/");
  }

  /**
   * Récupère les détails d'une bouteille spécifique
   * 
   * @param {number|string} id - Identifiant unique de la bouteille
   * @returns {Promise<Object>} Détails complets de la bouteille
   * @throws {Error} En cas de bouteille introuvable ou d'erreur API
   */
  async getBottle(id) {
    return this.request(`/bottles/${id}/`);
  }

  /**
   * Crée une nouvelle bouteille dans la cave
   * 
   * @param {Object|FormData} bottleData - Données de la bouteille (peut inclure des fichiers)
   * @param {string} bottleData.name - Nom du vin
   * @param {number} bottleData.year - Millésime
   * @param {string} bottleData.productor - Producteur
   * @param {string} bottleData.color - Couleur du vin
   * @param {number} [bottleData.quantity=1] - Quantité
   * @returns {Promise<Object>} Bouteille créée avec son ID
   * @throws {Error} En cas d'erreur de validation ou d'API
   */
  async createBottle(bottleData) {
    return this.request("/bottles/", {
      method: "POST",
      body: bottleData,
    });
  }

  /**
   * Met à jour complètement une bouteille existante
   * 
   * @param {number|string} id - Identifiant de la bouteille à modifier
   * @param {Object|FormData} bottleData - Nouvelles données complètes de la bouteille
   * @returns {Promise<Object>} Bouteille mise à jour
   * @throws {Error} En cas de bouteille introuvable ou d'erreur de validation
   */
  async updateBottle(id, bottleData) {
    return this.request(`/bottles/${id}/`, {
      method: "PUT",
      body: bottleData,
    });
  }

  /**
   * Met à jour partiellement une bouteille existante
   * 
   * @param {number|string} id - Identifiant de la bouteille à modifier
   * @param {Object} bottleData - Données partielles à modifier
   * @returns {Promise<Object>} Bouteille mise à jour
   * @throws {Error} En cas de bouteille introuvable ou d'erreur de validation
   */
  async patchBottle(id, bottleData) {
    return this.request(`/bottles/${id}/`, {
      method: "PATCH",
      body: bottleData,
    });
  }

  /**
   * Supprime définitivement une bouteille de la cave
   * 
   * @param {number|string} id - Identifiant de la bouteille à supprimer
   * @returns {Promise<null>} null en cas de succès (réponse 204)
   * @throws {Error} En cas de bouteille introuvable ou d'erreur API
   */
  async deleteBottle(id) {
    return this.request(`/bottles/${id}/`, {
      method: "DELETE",
    });
  }

  // =====================================
  // ENDPOINTS GESTION UTILISATEUR
  // =====================================

  /**
   * Récupère le profil de l'utilisateur connecté
   * 
   * Inclut les informations personnelles et les statistiques de la cave
   * (nombre total de bouteilles, etc.)
   * 
   * @returns {Promise<Object>} Profil utilisateur avec statistiques
   * @throws {Error} En cas d'erreur d'authentification ou d'API
   */
  async getUserProfile() {
    return this.request("/profile/");
  }
}

/**
 * Instance singleton du service API
 * 
 * Utilise cette instance dans toute l'application pour bénéficier
 * d'une configuration centralisée et d'un cache de tokens partagé.
 * 
 * @example
 * import { apiService } from './services/api';
 * 
 * // Récupérer toutes les bouteilles
 * const bottles = await apiService.getBottles();
 * 
 * // Créer une nouvelle bouteille
 * const newBottle = await apiService.createBottle({
 *   name: 'Château Margaux',
 *   year: 2015,
 *   productor: 'Château Margaux',
 *   color: 'Rouge'
 * });
 */
export const apiService = new ApiService();

/**
 * Classe ApiService pour créer des instances personnalisées
 * 
 * Utile pour les tests ou pour utiliser plusieurs configurations d'API.
 */
export default ApiService;
