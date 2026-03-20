import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../features/auth/authSlice";
import { API_BASE_URL, ENDPOINTS } from "../utils/config";
import axiosInstance from "../services/axiosInstance";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error, role } = useSelector(
    (state) => state.auth,
  );

  const login = async (credentials) => {
    console.log("credentials", credentials);

    dispatch(loginStart());
    const loginData = {
      email: credentials.email,
      password: credentials.password,
    };

    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}${ENDPOINTS.auth.login}`,
        loginData,
      );
      console.log("response", response);
      console.log(response.token);

      const token = response.token;

      dispatch(
        loginSuccess({
          user: credentials.email,
          token: token,
          role: credentials.userType,
        }),
      );
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      dispatch(loginFailure(error.message));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const signup = async (userData) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}${ENDPOINTS.auth.signup}`,
        userData
      );
      login()
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw error;
    }
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
