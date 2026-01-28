import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../features/auth/ProtectedRoute';
import AdminRoute from '../features/admin/AdminRoute';
import AdminRoutes from '../features/admin/routes/AdminRoutes';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import Profile from '../pages/Profile';
import Addresses from '../pages/Addresses';
import Track from '../pages/Track';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../pages/NotFound';
import Login from '../features/auth/Login';
import SignUp from '../pages/SignUp';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
            <Route path="/track" element={<ProtectedRoute><Track /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route
                path="/admin/*"
                element={
                    <AdminRoute>
                        <AdminRoutes />
                    </AdminRoute>
                }
            />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}