import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Dashboard from '../dashboard/Dashboard';
import ProductList from '../products/ProductList';
import ProductForm from '../products/AddProduct';
import OrderList from '../orders/OrderList';
import CourierList from '../logistics/CourierList';

/**
 * AdminRoutes - Nested routes for admin panel
 * All routes are wrapped in AdminLayout and AdminRoute protection
 */
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:productId" element={<ProductForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/logistics" element={<CourierList />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
