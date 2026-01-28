import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    totalCount: 0,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (!exists) {
        state.items.push(product);
        state.totalCount += 1;
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalCount = state.items.length;
    },

    isInWishlist: (state, action) => {
      return state.items.some((item) => item.id === action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
      state.totalCount = 0;
    },
  },
});

export const { addToWishlist, removeFromWishlist, isInWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
