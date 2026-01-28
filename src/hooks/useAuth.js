import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error, role } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    dispatch(loginStart());
    try {
      // Mock login - replace with actual API call
      const mockUser = { id: 1, name: 'John Doe', email: credentials.email, role: 'user' };
      dispatch(loginSuccess({ user: mockUser, token: 'mock-token', role: 'user' }));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    role,
    login,
    logout: logoutUser,
  };
};