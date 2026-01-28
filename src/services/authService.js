import axiosInstance from './axiosInstance';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export const authService = {
  /**
   * Login user with email and password
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register new user with signup details
   */
  signup: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/signup', {
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.mobileNumber,
        password: userData.password,
      });

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role);
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify OTP for login/signup
   */
  verifyOtp: async (email, otp) => {
    try {
      const response = await axiosInstance.post('/auth/verify-otp', {
        email,
        otp,
      });

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role);
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Send OTP to email
   */
  sendOtp: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/send-otp', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      return { success: true };
    } catch (error) {
      // Clear local storage even if API call fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      return { success: true };
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/auth/profile', profileData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Change password
   */
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await axiosInstance.post('/auth/change-password', {
        oldPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/request-password-reset', {
        email,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
