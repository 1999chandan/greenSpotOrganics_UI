import { createSlice } from '@reduxjs/toolkit';

const productAdminSlice = createSlice({
  name: 'productAdmin',
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
  },
  reducers: {
    // Fetch products
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      const { products, totalCount } = action.payload;
      state.products = products;
      state.totalCount = totalCount;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Create product
    createProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    },
    createProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Update product
    updateProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
    },
    updateProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete product
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.loading = false;
    },
    deleteProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Get single product
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  setCurrentProduct,
  setCurrentPage,
} = productAdminSlice.actions;

export default productAdminSlice.reducer;
