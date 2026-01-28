import axios from 'axios';
import store from '../app/store';

// Get the API base URL from environment variables
// Fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get auth token from Redux store or localStorage
    const state = store.getState();
    const token = state?.auth?.token || localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    // Success response - return data
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    const errorResponse = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      // Optionally dispatch logout action
      // dispatch(logout());
      errorResponse.message = 'Session expired. Please login again.';
    }

    // Handle 403 Forbidden - Insufficient permissions
    if (error.response?.status === 403) {
      errorResponse.message = 'You do not have permission to perform this action.';
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      errorResponse.message = 'Resource not found.';
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      errorResponse.message = 'Server error. Please try again later.';
    }

    // Handle network errors
    if (!error.response) {
      errorResponse.message = 'Network error. Please check your connection.';
    }

    return Promise.reject(errorResponse);
  }
);

export default axiosInstance;
