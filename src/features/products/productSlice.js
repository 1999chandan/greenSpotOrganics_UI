import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      categories: [],
      priceRange: [0, 1000],
      availability: 'all', // all, inStock, outOfStock
      search: '',
    },
    pagination: {
      currentPage: 1,
      pageSize: 12,
      totalCount: 0,
    },
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      const { items, totalCount } = action.payload;
      state.items = items;
      state.pagination.totalCount = totalCount;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Filter actions
    setCategories: (state, action) => {
      state.filters.categories = action.payload;
      state.pagination.currentPage = 1;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
      state.pagination.currentPage = 1;
    },
    setAvailability: (state, action) => {
      state.filters.availability = action.payload;
      state.pagination.currentPage = 1;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
      state.pagination.currentPage = 1;
    },
    resetFilters: (state) => {
      state.filters = {
        categories: [],
        priceRange: [0, 1000],
        availability: 'all',
        search: '',
      };
      state.pagination.currentPage = 1;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCategories,
  setPriceRange,
  setAvailability,
  setSearch,
  resetFilters,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
