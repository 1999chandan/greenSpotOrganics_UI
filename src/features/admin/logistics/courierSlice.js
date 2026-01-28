import { createSlice } from '@reduxjs/toolkit';

const courierSlice = createSlice({
  name: 'courier',
  initialState: {
    couriers: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {
    // Fetch couriers
    fetchCouriersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCouriersSuccess: (state, action) => {
      const { couriers, totalCount } = action.payload;
      state.couriers = couriers;
      state.totalCount = totalCount;
      state.loading = false;
    },
    fetchCouriersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Create courier
    createCourierStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCourierSuccess: (state, action) => {
      state.couriers.push(action.payload);
      state.loading = false;
    },
    createCourierFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Update courier
    updateCourierStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCourierSuccess: (state, action) => {
      const index = state.couriers.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.couriers[index] = action.payload;
      }
      state.loading = false;
    },
    updateCourierFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCouriersStart,
  fetchCouriersSuccess,
  fetchCouriersFailure,
  createCourierStart,
  createCourierSuccess,
  createCourierFailure,
  updateCourierStart,
  updateCourierSuccess,
  updateCourierFailure,
} = courierSlice.actions;

export default courierSlice.reducer;
