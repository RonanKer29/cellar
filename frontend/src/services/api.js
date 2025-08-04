import { API_BASE_URL } from "../utils/constants";

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

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

  // Wine/Bottle endpoints
  async getBottles() {
    return this.request("/bottles/");
  }

  async getBottle(id) {
    return this.request(`/bottles/${id}/`);
  }

  async createBottle(bottleData) {
    return this.request("/bottles/", {
      method: "POST",
      body: bottleData,
    });
  }

  async updateBottle(id, bottleData) {
    return this.request(`/bottles/${id}/`, {
      method: "PUT",
      body: bottleData,
    });
  }

  async patchBottle(id, bottleData) {
    return this.request(`/bottles/${id}/`, {
      method: "PATCH",
      body: bottleData,
    });
  }

  async deleteBottle(id) {
    return this.request(`/bottles/${id}/`, {
      method: "DELETE",
    });
  }

  // User profile endpoints
  async getUserProfile() {
    return this.request("/profile/");
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class for testing or custom instances
export default ApiService;
