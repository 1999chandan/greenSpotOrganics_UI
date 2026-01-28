/**
 * User Admin API Service
 * Handles user management for admin dashboard
 */

import axiosInstance from '../../../services/axiosInstance';

export const userAdminAPI = {
  // Fetch all users with pagination and filters
  fetchUsers: async (page = 1, pageSize = 10, search = '', role = '') => {
    try {
      const response = await axiosInstance.get('/admin/users', {
        params: { page, pageSize, search, role }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch users',
        status: error.status,
      };
    }
  },

  // Get single user details
  getUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch user',
        status: error.status,
      };
    }
  },

  // Update user details
  updateUser: async (userId, userData) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}`, userData);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update user',
        status: error.status,
      };
    }
  },

  // Change user role (admin/user)
  updateUserRole: async (userId, role) => {
    try {
      const response = await axiosInstance.patch(`/admin/users/${userId}/role`, { role });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update user role',
        status: error.status,
      };
    }
  },

  // Activate/Deactivate user account
  toggleUserStatus: async (userId, isActive) => {
    try {
      const response = await axiosInstance.patch(`/admin/users/${userId}/status`, { isActive });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update user status',
        status: error.status,
      };
    }
  },

  // Delete user account
  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to delete user',
        status: error.status,
      };
    }
  },

  // Get user statistics
  getUserStats: async () => {
    try {
      const response = await axiosInstance.get('/admin/users/statistics');
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch user statistics',
        status: error.status,
      };
    }
  },

  // Get user activity log
  getUserActivityLog: async (userId, page = 1, pageSize = 20) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}/activity-log`, {
        params: { page, pageSize }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch user activity log',
        status: error.status,
      };
    }
  },

  // Send notification/email to user
  sendUserNotification: async (userId, notificationData) => {
    try {
      const response = await axiosInstance.post(`/admin/users/${userId}/notify`, notificationData);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to send notification',
        status: error.status,
      };
    }
  },
};

export default userAdminAPI;
