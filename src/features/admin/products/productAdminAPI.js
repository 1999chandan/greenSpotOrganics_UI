/**
 * Product Admin API Service
 * Handles all product management API calls
 */

import axiosInstance from '../../../services/axiosInstance';

export const productAdminAPI = {
  // Fetch all products with pagination and search
  fetchProducts: async (page = 1, pageSize = 10, search = '') => {
    try {
      const response = await axiosInstance.get('/admin/products', {
        params: { page, pageSize, search }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch products',
        status: error.status,
      };
    }
  },

  // Get single product
  getProduct: async (productId) => {
    try {
      const response = await axiosInstance.get(`/admin/products/${productId}`);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to fetch product',
        status: error.status,
      };
    }
  },

  // Create product
  createProduct: async (formData) => {
    try {
      const response = await axiosInstance.post('/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to create product',
        status: error.status,
      };
    }
  },

  // Update product
  updateProduct: async (productId, formData) => {
    try {
      const response = await axiosInstance.put(
        `/admin/products/${productId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update product',
        status: error.status,
      };
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      const response = await axiosInstance.delete(`/admin/products/${productId}`);
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to delete product',
        status: error.status,
      };
    }
  },

  // Upload product image
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/admin/products/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to upload image',
        status: error.status,
      };
    }
  },

  // Toggle product active status
  toggleProductStatus: async (productId, isActive) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/products/${productId}/status`,
        { isActive }
      );
      return response;
    } catch (error) {
      throw {
        message: error.message || 'Failed to update product status',
        status: error.status,
      };
    }
  },
};

export default productAdminAPI;
