import { API_BASE_URL } from "../utils/constants";

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Wine/Bottle endpoints
  async getBottles() {
    return this.request('/bottles/');
  }

  async getBottle(id) {
    return this.request(`/bottles/${id}/`);
  }

  async createBottle(bottleData) {
    return this.request('/bottles/', {
      method: 'POST',
      body: bottleData,
    });
  }

  async updateBottle(id, bottleData) {
    return this.request(`/bottles/${id}/`, {
      method: 'PUT',
      body: bottleData,
    });
  }

  async deleteBottle(id) {
    return this.request(`/bottles/${id}/`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class for testing or custom instances
export default ApiService;