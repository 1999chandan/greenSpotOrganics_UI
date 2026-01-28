import axiosInstance from './axiosInstance';

/**
 * Product Service
 * Handles all product-related API calls for user-facing features
 */

export const productService = {
  /**
   * Fetch all products with filters and pagination
   */
  getProducts: async (filters = {}) => {
    try {
      const response = await axiosInstance.get('/products', {
        params: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 12,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search,
          sortBy: filters.sortBy || 'newest',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single product details
   */
  getProductById: async (productId) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get product categories
   */
  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/products/categories');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get product reviews
   */
  getProductReviews: async (productId) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}/reviews`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Submit product review
   */
  submitReview: async (productId, reviewData) => {
    try {
      const response = await axiosInstance.post(`/products/${productId}/reviews`, {
        rating: reviewData.rating,
        title: reviewData.title,
        comment: reviewData.comment,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get related products
   */
  getRelatedProducts: async (productId, limit = 4) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}/related`, {
        params: { limit },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search products
   */
  searchProducts: async (query) => {
    try {
      const response = await axiosInstance.get('/products/search', {
        params: { q: query },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get featured/bestselling products
   */
  getFeaturedProducts: async () => {
    try {
      const response = await axiosInstance.get('/products/featured');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
