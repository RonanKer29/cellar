import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
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

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    setUser(null);
  };

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
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};