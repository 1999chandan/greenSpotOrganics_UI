/**
 * Courier/Logistics API Service
 * Handles courier management and assignment
 */

import axiosInstance from '../../../services/axiosInstance';

export const courierAPI = {
  // Fetch all couriers
  fetchCouriers: async (page = 1, pageSize = 10) => {
    try {
      const response = await axiosInstance.get('/admin/couriers', {
        params: { page, pageSize }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch couriers',
        status: error.status,
      };
    }
  },

  // Get single courier with assignments
  getCourier: async (courierId) => {
    try {
      const response = await axiosInstance.get(`/admin/couriers/${courierId}`);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch courier',
        status: error.status,
      };
    }
  },

  // Create courier
  createCourier: async (courierData) => {
    try {
      const response = await axiosInstance.post('/admin/couriers', courierData);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to create courier',
        status: error.status,
      };
    }
  },

  // Update courier
  updateCourier: async (courierId, courierData) => {
    try {
      const response = await axiosInstance.put(`/admin/couriers/${courierId}`, courierData);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update courier',
        status: error.status,
      };
    }
  },

  // Delete courier
  deleteCourier: async (courierId) => {
    try {
      const response = await axiosInstance.delete(`/admin/couriers/${courierId}`);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to delete courier',
        status: error.status,
      };
    }
  },

  // Get available couriers (not at capacity)
  getAvailableCouriers: async () => {
    try {
      const response = await axiosInstance.get('/admin/couriers/available');
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch available couriers',
        status: error.status,
      };
    }
  },

  // Update courier load capacity
  updateCapacity: async (courierId, capacity) => {
    try {
      const response = await axiosInstance.patch(`/admin/couriers/${courierId}/capacity`, {
        currentLoadCapacity: capacity
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update courier capacity',
        status: error.status,
      };
    }
  },
};

export default courierAPI;
