import axiosInstance from './axiosInstance';

/**
 * Payment Service
 * Handles all payment-related API calls
 */

export const paymentService = {
  /**
   * Initialize payment
   */
  initiatePayment: async (paymentData) => {
    try {
      const response = await axiosInstance.post('/payments/initiate', {
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        currency: paymentData.currency || 'USD',
        paymentMethod: paymentData.paymentMethod,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Process card payment
   */
  processCardPayment: async (paymentData) => {
    try {
      const response = await axiosInstance.post('/payments/card', {
        orderId: paymentData.orderId,
        cardNumber: paymentData.cardNumber,
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv,
        cardholderName: paymentData.cardholderName,
        amount: paymentData.amount,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify payment (webhook callback)
   */
  verifyPayment: async (transactionId) => {
    try {
      const response = await axiosInstance.post('/payments/verify', {
        transactionId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get payment status
   */
  getPaymentStatus: async (transactionId) => {
    try {
      const response = await axiosInstance.get(`/payments/${transactionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Initiate refund
   */
  initiateRefund: async (orderId, amount, reason) => {
    try {
      const response = await axiosInstance.post('/payments/refund', {
        orderId,
        amount,
        reason,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get refund status
   */
  getRefundStatus: async (refundId) => {
    try {
      const response = await axiosInstance.get(`/payments/refunds/${refundId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Save payment method (for future purchases)
   */
  savePaymentMethod: async (paymentMethodData) => {
    try {
      const response = await axiosInstance.post('/payments/save-method', {
        type: paymentMethodData.type,
        cardNumber: paymentMethodData.cardNumber,
        expiryDate: paymentMethodData.expiryDate,
        cardholderName: paymentMethodData.cardholderName,
        isDefault: paymentMethodData.isDefault,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get saved payment methods
   */
  getSavedPaymentMethods: async () => {
    try {
      const response = await axiosInstance.get('/payments/saved-methods');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete saved payment method
   */
  deletePaymentMethod: async (methodId) => {
    try {
      const response = await axiosInstance.delete(`/payments/saved-methods/${methodId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentService;
