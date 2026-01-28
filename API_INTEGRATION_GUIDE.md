# Green Spot Organics - API Integration Guide

## Overview

This document provides comprehensive information about the API integration setup for the Green Spot Organics UI. The application uses Axios with a centralized service layer architecture for all backend communication.

## Architecture

### Service Layer Structure

```
src/services/
├── axiosInstance.js      # Axios instance with interceptors
├── authService.js        # Authentication endpoints
├── productService.js     # Product catalog endpoints
├── orderService.js       # Order management endpoints
└── paymentService.js     # Payment processing endpoints
```

### Admin API Structure

```
src/features/admin/
├── products/
│   └── productAdminAPI.js    # Product management endpoints
├── orders/
│   └── orderAdminAPI.js      # Order management endpoints
├── logistics/
│   └── courierAPI.js         # Courier/logistics endpoints
├── dashboard/
│   └── dashboardAPI.js       # Analytics/statistics endpoints
└── users/
    └── userAdminAPI.js       # User management endpoints
```

## Environment Configuration

### Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure API base URL:**
   ```env
   # .env.local
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. **Restart development server:**
   ```bash
   npm run dev
   ```

### Available Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` | `https://api.greenspotorganics.com/api` |
| `VITE_ENV` | Environment type | `development` | `production` |
| `VITE_ENABLE_ADMIN` | Enable admin features | `true` | `false` |
| `VITE_ENABLE_NOTIFICATIONS` | Enable notifications | `true` | `false` |

## Axios Instance Configuration

### File: `src/services/axiosInstance.js`

The axiosInstance provides:

- **Base Configuration:**
  - Base URL from `VITE_API_BASE_URL` environment variable
  - 10-second request timeout
  - Default headers for JSON content

- **Request Interceptor:**
  - Automatically adds JWT Bearer token from Redux store or localStorage
  - Runs before every request

- **Response Interceptor:**
  - Unwraps response data
  - Handles authentication errors (401)
  - Handles authorization errors (403)
  - Handles not found errors (404)
  - Handles server errors (500)
  - Handles network errors with user-friendly messages

### Token Management

Tokens are managed through multiple sources in priority order:

1. Redux store (`state.auth.token`)
2. Local storage (`localStorage.getItem('authToken')`)
3. No token (public endpoints)

### Error Handling

All errors are structured as:

```javascript
{
  message: "User-friendly error message",
  status: 400,  // HTTP status code
  response: {   // Original API response (if available)
    data: {},
    status: 400,
    statusText: "Bad Request"
  }
}
```

## Service Layer APIs

### Authentication Service (`authService.js`)

**Endpoints:**

```javascript
// Login
authService.login(email, password)
// POST /auth/login
// Returns: { user, token, role }

// Sign up
authService.signup(userData)
// POST /auth/signup
// Params: { fullName, email, phone, password }

// Verify OTP
authService.verifyOtp(email, otp)
// POST /auth/verify-otp

// Send OTP
authService.sendOtp(email)
// POST /auth/send-otp

// Get profile
authService.getProfile()
// GET /auth/profile

// Update profile
authService.updateProfile(profileData)
// PUT /auth/profile

// Change password
authService.changePassword(oldPassword, newPassword)
// POST /auth/change-password

// Request password reset
authService.requestPasswordReset(email)
// POST /auth/request-password-reset

// Reset password
authService.resetPassword(token, newPassword)
// POST /auth/reset-password

// Logout
authService.logout()
// POST /auth/logout
// Clears localStorage and Redux state
```

### Product Service (`productService.js`)

**Endpoints:**

```javascript
// Get all products with filters
productService.getProducts({
  page: 1,
  pageSize: 10,
  category: 'vegetables',
  minPrice: 10,
  maxPrice: 100,
  search: 'tomato',
  sortBy: 'name' // or 'price', 'popularity', 'newest'
})
// GET /products

// Get single product
productService.getProductById(productId)
// GET /products/{productId}

// Get categories
productService.getCategories()
// GET /products/categories

// Get product reviews
productService.getProductReviews(productId)
// GET /products/{productId}/reviews

// Submit review
productService.submitReview(productId, {
  rating: 5,
  title: 'Great product',
  comment: 'Excellent quality'
})
// POST /products/{productId}/reviews

// Get related products
productService.getRelatedProducts(productId, limit = 5)
// GET /products/{productId}/related

// Search products
productService.searchProducts(query)
// GET /products/search?q={query}

// Get featured products
productService.getFeaturedProducts()
// GET /products/featured
```

### Order Service (`orderService.js`)

**Endpoints:**

```javascript
// Get all orders
orderService.getOrders({
  page: 1,
  pageSize: 10,
  status: 'pending', // or 'shipped', 'delivered', 'cancelled'
  sortBy: 'newest'
})
// GET /orders

// Get single order
orderService.getOrderById(orderId)
// GET /orders/{orderId}

// Create order
orderService.createOrder({
  items: [{ productId, quantity, price }],
  shippingAddress: { /* address details */ },
  shippingMethod: 'standard', // or 'express'
  paymentMethod: 'card', // or 'upi', 'net-banking'
  paymentDetails: { /* payment info */ }
})
// POST /orders

// Update order status (admin only)
orderService.updateOrderStatus(orderId, status)
// PATCH /orders/{orderId}/status

// Cancel order
orderService.cancelOrder(orderId, reason)
// POST /orders/{orderId}/cancel

// Get tracking info
orderService.getTrackingInfo(orderId)
// GET /orders/{orderId}/tracking

// Track by number
orderService.trackByNumber(trackingNumber)
// GET /orders/track?trackingNumber={trackingNumber}

// Download invoice
orderService.downloadInvoice(orderId)
// GET /orders/{orderId}/invoice
// Returns: Blob (PDF file)

// Initiate return
orderService.initiateReturn(orderId, itemId, reason)
// POST /orders/{orderId}/returns

// Get return history
orderService.getReturnHistory()
// GET /orders/returns
```

### Payment Service (`paymentService.js`)

**Endpoints:**

```javascript
// Initiate payment
paymentService.initiatePayment({
  orderId,
  amount,
  currency: 'USD',
  paymentMethod: 'card'
})
// POST /payments/initiate

// Process card payment
paymentService.processCardPayment({
  orderId,
  cardNumber,
  expiryDate,
  cvv,
  cardholderName,
  amount
})
// POST /payments/card

// Verify payment
paymentService.verifyPayment(transactionId)
// POST /payments/verify

// Get payment status
paymentService.getPaymentStatus(transactionId)
// GET /payments/{transactionId}

// Initiate refund
paymentService.initiateRefund(orderId, amount, reason)
// POST /payments/refund

// Get refund status
paymentService.getRefundStatus(refundId)
// GET /payments/refunds/{refundId}

// Save payment method
paymentService.savePaymentMethod({
  cardNumber,
  expiryDate,
  cardholderName,
  isDefault: false
})
// POST /payments/save-method

// Get saved payment methods
paymentService.getSavedPaymentMethods()
// GET /payments/saved-methods

// Delete payment method
paymentService.deletePaymentMethod(methodId)
// DELETE /payments/saved-methods/{methodId}
```

## Admin APIs

### Product Admin API (`productAdminAPI.js`)

```javascript
// Fetch all products
productAdminAPI.fetchProducts(page, pageSize, search)
// GET /admin/products

// Get single product
productAdminAPI.getProduct(productId)
// GET /admin/products/{productId}

// Create product
productAdminAPI.createProduct(formData) // multipart/form-data
// POST /admin/products

// Update product
productAdminAPI.updateProduct(productId, formData) // multipart/form-data
// PUT /admin/products/{productId}

// Delete product
productAdminAPI.deleteProduct(productId)
// DELETE /admin/products/{productId}

// Upload image
productAdminAPI.uploadImage(file)
// POST /admin/products/upload

// Toggle product status
productAdminAPI.toggleProductStatus(productId, isActive)
// PATCH /admin/products/{productId}/status
```

### Order Admin API (`orderAdminAPI.js`)

```javascript
// Fetch orders
orderAdminAPI.fetchOrders(filters, page, pageSize)
// GET /admin/orders

// Get single order
orderAdminAPI.getOrder(orderId)
// GET /admin/orders/{orderId}

// Update order status
orderAdminAPI.updateOrderStatus(orderId, status)
// PATCH /admin/orders/{orderId}/status

// Assign courier
orderAdminAPI.assignCourier(orderId, courierId, trackingNumber)
// PATCH /admin/orders/{orderId}/assign-courier

// Export orders
orderAdminAPI.exportOrders(filters)
// GET /admin/orders/export

// Get order statistics
orderAdminAPI.getOrderStats()
// GET /admin/orders/statistics
```

### Courier API (`courierAPI.js`)

```javascript
// Fetch couriers
courierAPI.fetchCouriers(page, pageSize)
// GET /admin/couriers

// Get single courier
courierAPI.getCourier(courierId)
// GET /admin/couriers/{courierId}

// Create courier
courierAPI.createCourier(courierData)
// POST /admin/couriers

// Update courier
courierAPI.updateCourier(courierId, courierData)
// PUT /admin/couriers/{courierId}

// Delete courier
courierAPI.deleteCourier(courierId)
// DELETE /admin/couriers/{courierId}

// Get available couriers
courierAPI.getAvailableCouriers()
// GET /admin/couriers/available

// Update courier capacity
courierAPI.updateCapacity(courierId, capacity)
// PATCH /admin/couriers/{courierId}/capacity
```

### Dashboard API (`dashboardAPI.js`)

```javascript
// Fetch statistics
dashboardAPI.fetchStats()
// GET /admin/dashboard/stats

// Get sales trend
dashboardAPI.getSalesTrend(period) // 'daily', 'weekly', 'monthly'
// GET /admin/dashboard/sales-trend

// Get top products
dashboardAPI.getTopProducts(limit)
// GET /admin/dashboard/top-products

// Get category sales
dashboardAPI.getCategorySales()
// GET /admin/dashboard/category-sales

// Get order statistics
dashboardAPI.getOrderStats(period)
// GET /admin/dashboard/order-stats

// Get revenue breakdown
dashboardAPI.getRevenueBreakdown()
// GET /admin/dashboard/revenue-breakdown
```

### User Admin API (`userAdminAPI.js`)

```javascript
// Fetch users
userAdminAPI.fetchUsers(page, pageSize, search, role)
// GET /admin/users

// Get single user
userAdminAPI.getUser(userId)
// GET /admin/users/{userId}

// Update user
userAdminAPI.updateUser(userId, userData)
// PUT /admin/users/{userId}

// Update user role
userAdminAPI.updateUserRole(userId, role)
// PATCH /admin/users/{userId}/role

// Toggle user status
userAdminAPI.toggleUserStatus(userId, isActive)
// PATCH /admin/users/{userId}/status

// Delete user
userAdminAPI.deleteUser(userId)
// DELETE /admin/users/{userId}

// Get user statistics
userAdminAPI.getUserStats()
// GET /admin/users/statistics

// Get user activity log
userAdminAPI.getUserActivityLog(userId, page, pageSize)
// GET /admin/users/{userId}/activity-log

// Send user notification
userAdminAPI.sendUserNotification(userId, notificationData)
// POST /admin/users/{userId}/notify
```

## Usage Examples

### Using Services in Components

```javascript
import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProducts({
          page: 1,
          pageSize: 10,
          category: 'vegetables'
        });
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Using with Redux

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../features/auth/authSlice';
import { authService } from '../services/authService';

function LoginForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const handleLogin = async (email, password) => {
    try {
      const { user, token, role } = await authService.login(email, password);
      dispatch(loginSuccess({ user, token, role }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    // Form JSX
  );
}
```

## Error Handling Best Practices

1. **Always wrap API calls in try-catch:**
   ```javascript
   try {
     const data = await productService.getProducts();
   } catch (error) {
     console.error(error.message);
     // Show error to user
   }
   ```

2. **Display user-friendly messages:**
   ```javascript
   const errorMessage = error.message || 'Something went wrong. Please try again.';
   ```

3. **Handle specific HTTP status codes:**
   ```javascript
   if (error.status === 401) {
     // Redirect to login
   } else if (error.status === 403) {
     // Show unauthorized message
   } else if (error.status === 404) {
     // Show not found message
   }
   ```

## Security Considerations

1. **Token Management:**
   - Tokens are automatically included in all requests via interceptors
   - Never expose tokens in client-side code
   - Always use HTTPS in production

2. **Sensitive Data:**
   - Never log tokens or sensitive information
   - Use secure storage for sensitive data
   - Never commit `.env.local` or `.env` files

3. **CORS:**
   - Ensure backend is configured to accept requests from your domain
   - In development, backend should allow `http://localhost:5173`
   - In production, backend should allow your domain only

## Debugging

### Enable Request/Response Logging

Add this to `axiosInstance.js` for debugging:

```javascript
axiosInstance.interceptors.request.use((config) => {
  console.log('Request:', config.method.toUpperCase(), config.url);
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  console.log('Response:', response.status, response.data);
  return response;
});
```

### Check Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform an action that makes an API call
4. Click on the request to view:
   - Request headers (including Authorization)
   - Request body
   - Response data
   - Status code

## Troubleshooting

### 401 Unauthorized

**Problem:** Getting 401 errors on protected endpoints
**Solution:**
- Ensure `.env.local` has correct `VITE_API_BASE_URL`
- Check token is being persisted to localStorage
- Verify token is being sent in Authorization header
- Check token hasn't expired

### CORS Errors

**Problem:** "Access to XMLHttpRequest blocked by CORS policy"
**Solution:**
- Ensure backend has CORS middleware enabled
- Check backend allows your frontend origin
- In dev: backend should allow `http://localhost:5173`
- In production: backend should allow your domain

### Network Timeout

**Problem:** Requests timing out
**Solution:**
- Check backend server is running
- Verify API base URL is correct
- Check network connectivity
- Increase timeout in `axiosInstance.js` if needed (currently 10 seconds)

## Next Steps

1. **Setup Backend:**
   - Implement all required endpoints matching the service layer
   - Enable CORS for frontend origin
   - Implement JWT authentication middleware

2. **Implement Redux Thunks:**
   - Create async thunks for each service
   - Update components to dispatch thunks
   - Add loading/error state management

3. **Add Error Handling UI:**
   - Implement toast notifications for errors
   - Add retry mechanisms
   - Show user-friendly error messages

4. **Testing:**
   - Write tests for service layer
   - Mock axios for component tests
   - Test error scenarios

## Questions & Support

For issues or questions about API integration:
1. Check this guide first
2. Review error messages in browser console
3. Check Network tab in DevTools
4. Review error handling section above
