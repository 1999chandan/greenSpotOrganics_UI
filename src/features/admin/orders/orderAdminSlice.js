import { createSlice } from '@reduxjs/toolkit';

const orderAdminSlice = createSlice({
  name: 'orderAdmin',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    filters: {
      status: 'all', // all, pending, processing, shipped, delivered, cancelled
      dateRange: null,
    },
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
  },
  reducers: {
    // Fetch orders
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      const { orders, totalCount } = action.payload;
      state.orders = orders;
      state.totalCount = totalCount;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Get single order
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },

    // Update order status
    updateOrderStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrderStatusSuccess: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
      }
      if (state.currentOrder?.id === orderId) {
        state.currentOrder.status = status;
      }
      state.loading = false;
    },
    updateOrderStatusFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Assign courier
    assignCourierStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    assignCourierSuccess: (state, action) => {
      const { orderId, courierId, trackingNumber } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.courierId = courierId;
        order.trackingNumber = trackingNumber;
        order.status = 'shipped';
      }
      if (state.currentOrder?.id === orderId) {
        state.currentOrder.courierId = courierId;
        state.currentOrder.trackingNumber = trackingNumber;
        state.currentOrder.status = 'shipped';
      }
      state.loading = false;
    },
    assignCourierFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Set filters
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      state.currentPage = 1;
    },

    setDateRangeFilter: (state, action) => {
      state.filters.dateRange = action.payload;
      state.currentPage = 1;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  setCurrentOrder,
  updateOrderStatusStart,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
  assignCourierStart,
  assignCourierSuccess,
  assignCourierFailure,
  setStatusFilter,
  setDateRangeFilter,
  setCurrentPage,
} = orderAdminSlice.actions;

export default orderAdminSlice.reducer;
