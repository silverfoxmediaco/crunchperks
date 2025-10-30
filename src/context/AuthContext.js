import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiClient } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Validate token by fetching current user
          const response = await apiClient.get('/auth/partner/me');

          if (response.data && response.data.partner) {
            setUser(response.data.partner);
          }
        } catch (error) {
          // Token invalid or expired, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/partner/login', {
        email,
        password
      });

      if (response.data && response.data.token) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.partner));
        setUser(response.data.partner);

        return { success: true };
      }

      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed. Please check your credentials.'
      };
    }
  };

  const signup = async (email, password, applicationId) => {
    try {
      const response = await apiClient.post('/auth/partner/signup', {
        email,
        password,
        applicationId
      });

      if (response.data && response.data.token) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.partner));
        setUser(response.data.partner);

        return { success: true };
      }

      return {
        success: false,
        error: 'Signup failed. Please try again.'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Account creation failed. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
