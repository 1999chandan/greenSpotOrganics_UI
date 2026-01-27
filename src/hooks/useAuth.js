import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../features/auth/authSlice';
// import authAPI from '../features/auth/authAPI'; // implement API calls

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    dispatch(loginStart());
    try {
      // const user = await authAPI.login(credentials);
      // Mock for now
      const user = { id: 1, name: 'User' };
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, isAuthenticated, loading, error, login, logout: logoutUser };
};