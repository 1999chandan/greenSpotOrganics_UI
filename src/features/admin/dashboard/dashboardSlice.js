import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      activeUsers: 0,
    },
    recentOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action) => {
      state.stats = action.payload.stats;
      state.recentOrders = action.payload.recentOrders;
      state.loading = false;
    },
    fetchStatsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure } = dashboardSlice.actions;
export default dashboardSlice.reducer;
