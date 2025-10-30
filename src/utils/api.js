const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  // Handle 401 - Unauthorized (token invalid or expired)
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Only redirect if not already on login/signup pages
    if (!window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/signup') &&
        !window.location.pathname.includes('/partner/create-account')) {
      window.location.href = '/login?session=expired';
    }
  }

  const data = await response.json();

  if (!response.ok) {
    // Throw error with message from backend
    const error = new Error(data.message || `API error: ${response.statusText}`);
    error.errors = data.errors || [];
    throw error;
  }

  return data;
};

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const apiClient = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders()
    });

    return handleResponse(response);
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });

    return handleResponse(response);
  },

  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });

    return handleResponse(response);
  },

  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    return handleResponse(response);
  }
};
