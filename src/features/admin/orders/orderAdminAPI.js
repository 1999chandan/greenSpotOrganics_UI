/**
 * Order Admin API Service
 * Handles all order management API calls
 */

import axiosInstance from '../../../services/axiosInstance';

export const orderAdminAPI = {
  // Fetch orders with filters
  fetchOrders: async (filters = {}, page = 1, pageSize = 10) => {
    try {
      const response = await axiosInstance.get('/admin/orders', {
        params: { 
          ...filters,
          page, 
          pageSize,
          status: filters.status
        }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch orders',
        status: error.status,
      };
    }
  },

  // Get single order
  getOrder: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/admin/orders/${orderId}`);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch order',
        status: error.status,
      };
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/orders/${orderId}/status`,
        { status }
      );
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update order status',
        status: error.status,
      };
    }
  },

  // Assign courier to order
  assignCourier: async (orderId, courierId, trackingNumber = '') => {
    try {
      const response = await axiosInstance.patch(
        `/admin/orders/${orderId}/assign-courier`,
        { courierId, trackingNumber }
      );
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to assign courier',
        status: error.status,
      };
    }
  },

  // Export orders (CSV)
  exportOrders: async (filters = {}) => {
    try {
      const response = await axiosInstance.get('/admin/orders/export', {
        params: filters,
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to export orders',
        status: error.status,
      };
    }
  },

  // Get order statistics
  getOrderStats: async () => {
    try {
      const response = await axiosInstance.get('/admin/orders/statistics');
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch order statistics',
        status: error.status,
      };
    }
  },
};

export default orderAdminAPI;
