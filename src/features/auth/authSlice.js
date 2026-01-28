import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: null,
    role: null, // 'admin' | 'user'
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setRole } = authSlice.actions;
export default authSlice.reducer;