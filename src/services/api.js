// API base URL - adjust this based on your backend deployment
const API_BASE_URL = 'http://localhost:5000/api';

// API configuration
const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Add auth header to requests
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    ...API_CONFIG.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...API_CONFIG,
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication Service
export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!getAuthToken();
  },
};

// Form Service
export const formService = {
  // Submit abstract (Step 1)
  submitAbstract: async (abstractData) => {
    return await apiRequest('/forms/abstract', {
      method: 'POST',
      body: JSON.stringify(abstractData),
    });
  },

  // Get abstract status
  getAbstractStatus: async () => {
    return await apiRequest('/forms/abstract');
  },

  // Submit detailed form (Step 2)
  submitDetails: async (detailsData) => {
    return await apiRequest('/forms/details', {
      method: 'POST',
      body: JSON.stringify(detailsData),
    });
  },

  // Get details status
  getDetailsStatus: async () => {
    return await apiRequest('/forms/details');
  },

  // Schedule pitch (Step 3)
  schedulePitch: async (pitchData) => {
    return await apiRequest('/forms/pitch', {
      method: 'POST',
      body: JSON.stringify(pitchData),
    });
  },

  // Get pitch status
  getPitchStatus: async () => {
    return await apiRequest('/forms/pitch');
  },

  // Get all user submissions
  getAllSubmissions: async () => {
    return await apiRequest('/forms/all');
  },
};

// Admin Service
export const adminService = {
  // Get all abstracts
  getAllAbstracts: async () => {
    return await apiRequest('/admin/abstracts');
  },

  // Get all detailed submissions
  getAllDetails: async () => {
    return await apiRequest('/admin/details');
  },

  // Get all pitches
  getAllPitches: async () => {
    return await apiRequest('/admin/pitches');
  },

  // Update abstract status
  updateAbstractStatus: async (id, status) => {
    return await apiRequest(`/admin/abstracts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Update details status
  updateDetailsStatus: async (id, status) => {
    return await apiRequest(`/admin/details/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Update pitch status
  updatePitchStatus: async (id, status) => {
    return await apiRequest(`/admin/pitches/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Get all users
  getAllUsers: async () => {
    return await apiRequest('/admin/users');
  },
};
