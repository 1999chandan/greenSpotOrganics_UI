/**
 * Dashboard API Service
 * Handles dashboard statistics and analytics
 */

import axiosInstance from '../../../services/axiosInstance';

export const dashboardAPI = {
  // Fetch dashboard statistics
  fetchStats: async () => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/stats');
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch dashboard stats',
        status: error.status,
      };
    }
  },

  // Get sales trend (daily/weekly/monthly)
  getSalesTrend: async (period = 'weekly') => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/sales-trend', {
        params: { period }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch sales trend',
        status: error.status,
      };
    }
  },

  // Get top selling products
  getTopProducts: async (limit = 5) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/top-products', {
        params: { limit }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch top products',
        status: error.status,
      };
    }
  },

  // Get category-wise sales
  getCategorySales: async () => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/category-sales');
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch category sales',
        status: error.status,
      };
    }
  },

  // Get order statistics
  getOrderStats: async (period = 'month') => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/order-stats', {
        params: { period }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch order statistics',
        status: error.status,
      };
    }
  },

  // Get revenue breakdown
  getRevenueBreakdown: async () => {
    try {
      const response = await axiosInstance.get('/admin/dashboard/revenue-breakdown');
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch revenue breakdown',
        status: error.status,
      };
    }
  },
};

export default dashboardAPI;
