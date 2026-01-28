import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * AdminRoute - Protects admin pages with role-based access control
 * Only users with 'admin' role can access protected routes
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
const isAdmin = localStorage.getItem("userRole") == "admin";
console.log(isAdmin);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
