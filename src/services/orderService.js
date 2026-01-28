import axiosInstance from './axiosInstance';

/**
 * Order Service
 * Handles all order-related API calls
 */

export const orderService = {
  /**
   * Get user's orders
   */
  getOrders: async (filters = {}) => {
    try {
      const response = await axiosInstance.get('/orders', {
        params: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 10,
          status: filters.status,
          sortBy: filters.sortBy || 'recent',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single order details
   */
  getOrderById: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new order (checkout)
   */
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/orders', {
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        shippingMethod: orderData.shippingMethod,
        paymentMethod: orderData.paymentMethod,
        paymentDetails: orderData.paymentDetails,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update order status (Admin only)
   */
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
        status,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancel order
   */
  cancelOrder: async (orderId, reason) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/cancel`, {
        reason,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get order tracking information
   */
  getTrackingInfo: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}/tracking`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get tracking by tracking number
   */
  trackByNumber: async (trackingNumber) => {
    try {
      const response = await axiosInstance.get('/orders/track', {
        params: { trackingNumber },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Download order invoice
   */
  downloadInvoice: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}/invoice`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Return order item
   */
  initiateReturn: async (orderId, itemId, reason) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/returns`, {
        itemId,
        reason,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get return history
   */
  getReturnHistory: async () => {
    try {
      const response = await axiosInstance.get('/orders/returns');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
