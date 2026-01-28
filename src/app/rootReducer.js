import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productAdminReducer from '../features/admin/products/productAdminSlice';
import orderAdminReducer from '../features/admin/orders/orderAdminSlice';
import courierReducer from '../features/admin/logistics/courierSlice';
import dashboardReducer from '../features/admin/dashboard/dashboardSlice';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import productsReducer from '../features/products/productSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  productAdmin: productAdminReducer,
  orderAdmin: orderAdminReducer,
  courier: courierReducer,
  dashboard: dashboardReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  products: productsReducer,
});

export default rootReducer;