# Backend API Implementation Checklist

This document provides a complete checklist of all API endpoints that need to be implemented on the backend to support the Green Spot Organics UI.

## Prerequisites

- [ ] Node.js/Express or similar backend framework
- [ ] MongoDB/PostgreSQL or similar database
- [ ] JWT authentication middleware
- [ ] CORS middleware configured for frontend origin
- [ ] Environment variables setup (.env file)

## Authentication Endpoints

**Base URL:** `/api/auth`

- [ ] `POST /auth/login` - User login with email/password
  - Request: `{ email, password }`
  - Response: `{ user: { id, name, email }, token, role }`
  - Errors: 400 (invalid credentials), 401 (not found)

- [ ] `POST /auth/signup` - User registration
  - Request: `{ fullName, email, phone, password }`
  - Response: `{ user: { id, name, email }, token, role }`
  - Validation: Email format, password strength, phone format
  - Errors: 400 (invalid input), 409 (email exists)

- [ ] `POST /auth/verify-otp` - Verify OTP for email verification
  - Request: `{ email, otp }`
  - Response: `{ verified: true, token, user }`
  - Errors: 400 (invalid OTP), 401 (expired)

- [ ] `POST /auth/send-otp` - Send OTP to email
  - Request: `{ email }`
  - Response: `{ success: true, message: "OTP sent" }`
  - Errors: 404 (email not found)

- [ ] `POST /auth/logout` - User logout
  - Request: `{ }`
  - Response: `{ success: true }`
  - Auth: Required
  - Errors: 401 (not authenticated)

- [ ] `GET /auth/profile` - Get current user profile
  - Response: `{ user: { id, name, email, phone, role, createdAt } }`
  - Auth: Required
  - Errors: 401 (not authenticated)

- [ ] `PUT /auth/profile` - Update user profile
  - Request: `{ name, phone, address, profilePicture }`
  - Response: `{ user: { ... } }`
  - Auth: Required
  - Errors: 400 (invalid input), 401 (not authenticated)

- [ ] `POST /auth/change-password` - Change password
  - Request: `{ oldPassword, newPassword }`
  - Response: `{ success: true }`
  - Auth: Required
  - Validation: Old password must be correct, new password strength
  - Errors: 400 (invalid password), 401 (not authenticated)

- [ ] `POST /auth/request-password-reset` - Request password reset
  - Request: `{ email }`
  - Response: `{ success: true, message: "Reset email sent" }`
  - Action: Send email with reset token
  - Errors: 404 (email not found)

- [ ] `POST /auth/reset-password` - Reset password with token
  - Request: `{ token, newPassword }`
  - Response: `{ success: true }`
  - Validation: Token must be valid and not expired
  - Errors: 400 (invalid token), 401 (expired token)

## Product Endpoints

**Base URL:** `/api/products`

- [ ] `GET /products` - Get all products with filters
  - Query Params: `page, pageSize, category, minPrice, maxPrice, search, sortBy`
  - Response: `{ products: [...], totalCount, totalPages }`
  - Pagination: Default pageSize=10, max pageSize=100
  - Filters: Support category, price range, search by name/description
  - Sorting: By name, price, popularity, newest, rating
  - Errors: 400 (invalid filters)

- [ ] `GET /products/:productId` - Get single product details
  - Response: `{ id, name, description, price, images, category, rating, reviews, stock }`
  - Errors: 404 (not found)

- [ ] `GET /products/categories` - Get all product categories
  - Response: `{ categories: [{ id, name, description, imageUrl }] }`
  - Caching: Consider caching this endpoint

- [ ] `GET /products/:productId/reviews` - Get product reviews
  - Query Params: `page, pageSize`
  - Response: `{ reviews: [...], totalCount }`
  - Each review: `{ id, userId, rating, title, comment, createdAt }`
  - Errors: 404 (product not found)

- [ ] `POST /products/:productId/reviews` - Submit product review
  - Request: `{ rating (1-5), title, comment }`
  - Response: `{ review: { id, userId, rating, title, comment, createdAt } }`
  - Auth: Required
  - Validation: Rating must be 1-5, user must have purchased product
  - Errors: 400 (invalid input), 401 (not authenticated), 403 (not purchased)

- [ ] `GET /products/:productId/related` - Get related products
  - Query Params: `limit (default: 5)`
  - Response: `{ relatedProducts: [...] }`
  - Logic: Same category, similar price range, high ratings
  - Errors: 404 (product not found)

- [ ] `GET /products/search` - Search products
  - Query Params: `q (search query)`
  - Response: `{ products: [...], totalCount }`
  - Search: Name, description, category, tags
  - Full-text search recommended
  - Errors: 400 (empty query)

- [ ] `GET /products/featured` - Get featured products
  - Response: `{ products: [...] }`
  - Logic: Products marked as featured, limited count (e.g., 12)
  - Caching: Consider caching this endpoint

## Order Endpoints

**Base URL:** `/api/orders`

- [ ] `GET /orders` - Get user's orders
  - Query Params: `page, pageSize, status, sortBy`
  - Response: `{ orders: [...], totalCount }`
  - Auth: Required
  - Filters: By status (pending, shipped, delivered, cancelled)
  - Sorting: By date, status, amount
  - Errors: 401 (not authenticated)

- [ ] `GET /orders/:orderId` - Get order details
  - Response: `{ id, orderNumber, items, totalAmount, status, shippingAddress, trackingNumber, createdAt }`
  - Auth: Required (must be order owner or admin)
  - Errors: 401 (not authenticated), 403 (not authorized), 404 (not found)

- [ ] `POST /orders` - Create new order
  - Request: `{ items: [{ productId, quantity, price }], shippingAddress, shippingMethod, paymentMethod, paymentDetails }`
  - Response: `{ id, orderNumber, totalAmount, estimatedDelivery }`
  - Auth: Required
  - Validation: Items must be in stock, address must be valid
  - Action: Create order, reserve inventory, trigger payment processing
  - Errors: 400 (invalid data), 401 (not authenticated), 409 (item out of stock)

- [ ] `PATCH /orders/:orderId/status` - Update order status (admin only)
  - Request: `{ status }`
  - Response: `{ id, status, updatedAt }`
  - Auth: Required (admin role)
  - Status values: pending, processing, shipped, delivered, cancelled, returned
  - Errors: 400 (invalid status), 401 (not authenticated), 403 (not authorized)

- [ ] `POST /orders/:orderId/cancel` - Cancel order
  - Request: `{ reason }`
  - Response: `{ success: true, message: "Order cancelled" }`
  - Auth: Required (must be order owner)
  - Validation: Order must not be shipped or delivered
  - Action: Update status, refund payment, restore inventory
  - Errors: 401 (not authenticated), 403 (not authorized), 409 (cannot cancel)

- [ ] `GET /orders/:orderId/tracking` - Get tracking info for order
  - Response: `{ trackingNumber, courier, status, updates: [{ timestamp, location, status }] }`
  - Auth: Required (must be order owner or admin)
  - Errors: 401 (not authenticated), 404 (not found)

- [ ] `GET /orders/track?trackingNumber=...` - Track by tracking number
  - Query Params: `trackingNumber`
  - Response: `{ trackingNumber, status, updates: [...] }`
  - Public endpoint (no auth required)
  - Errors: 404 (tracking not found)

- [ ] `GET /orders/:orderId/invoice` - Download order invoice
  - Response: PDF file (Blob)
  - Auth: Required (must be order owner or admin)
  - Action: Generate PDF invoice
  - Errors: 401 (not authenticated), 404 (not found)

- [ ] `POST /orders/:orderId/returns` - Initiate return
  - Request: `{ itemId, reason }`
  - Response: `{ returnId, status, estimatedRefund }`
  - Auth: Required
  - Validation: Must be within return window (e.g., 30 days)
  - Errors: 400 (invalid item), 401 (not authenticated), 409 (return window expired)

- [ ] `GET /orders/returns` - Get user's returns
  - Query Params: `page, pageSize, status`
  - Response: `{ returns: [...], totalCount }`
  - Auth: Required
  - Errors: 401 (not authenticated)

## Payment Endpoints

**Base URL:** `/api/payments`

- [ ] `POST /payments/initiate` - Initiate payment
  - Request: `{ orderId, amount, currency, paymentMethod }`
  - Response: `{ transactionId, status, redirectUrl (if needed) }`
  - Auth: Required
  - Validation: Amount must match order total
  - Errors: 400 (invalid data), 401 (not authenticated), 404 (order not found)

- [ ] `POST /payments/card` - Process card payment
  - Request: `{ orderId, cardNumber, expiryDate, cvv, cardholderName, amount }`
  - Response: `{ transactionId, status, message }`
  - Auth: Required
  - Validation: Card details must be valid
  - Security: Use tokenization, never log full card details
  - Errors: 400 (invalid card), 401 (not authenticated), 402 (payment declined)

- [ ] `POST /payments/verify` - Verify payment
  - Request: `{ transactionId }`
  - Response: `{ status, verified: true/false }`
  - Auth: Required
  - Errors: 404 (transaction not found)

- [ ] `GET /payments/:transactionId` - Get payment status
  - Response: `{ id, status, amount, orderId, method, createdAt }`
  - Auth: Required (must be payment owner or admin)
  - Errors: 401 (not authenticated), 404 (not found)

- [ ] `POST /payments/refund` - Initiate refund
  - Request: `{ orderId, amount, reason }`
  - Response: `{ refundId, status, estimatedDate }`
  - Auth: Required (admin)
  - Validation: Amount must not exceed original payment
  - Errors: 400 (invalid amount), 401 (not authenticated), 403 (not authorized)

- [ ] `GET /payments/refunds/:refundId` - Get refund status
  - Response: `{ id, status, amount, orderId, reason, initiatedAt, completedAt }`
  - Auth: Required (admin or payment owner)
  - Errors: 404 (not found)

- [ ] `POST /payments/save-method` - Save payment method
  - Request: `{ cardNumber, expiryDate, cardholderName, isDefault }`
  - Response: `{ methodId, last4Digits, brand, isDefault }`
  - Auth: Required
  - Security: Tokenize card, never store full details
  - Errors: 400 (invalid card)

- [ ] `GET /payments/saved-methods` - Get saved payment methods
  - Response: `{ methods: [{ id, last4Digits, brand, expiryDate, isDefault }] }`
  - Auth: Required
  - Errors: 401 (not authenticated)

- [ ] `DELETE /payments/saved-methods/:methodId` - Delete payment method
  - Response: `{ success: true }`
  - Auth: Required
  - Errors: 401 (not authenticated), 404 (not found)

## Admin Product Endpoints

**Base URL:** `/api/admin/products`

- [ ] `GET /admin/products` - List all products (admin)
  - Query Params: `page, pageSize, search`
  - Response: `{ products: [...], totalCount }`
  - Auth: Required (admin role)
  - Errors: 401 (not authenticated), 403 (not authorized)

- [ ] `GET /admin/products/:productId` - Get product details (admin)
  - Response: `{ id, name, description, price, cost, category, images, stock, status }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `POST /admin/products` - Create product (admin)
  - Request: FormData with `name, description, price, cost, category, images, stock`
  - Response: `{ id, name, ... }`
  - Auth: Required (admin)
  - Validation: All required fields, valid price/cost
  - Errors: 400 (invalid data), 401, 403

- [ ] `PUT /admin/products/:productId` - Update product (admin)
  - Request: FormData with `name, description, price, cost, category, images, stock`
  - Response: `{ id, ... }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403, 404

- [ ] `DELETE /admin/products/:productId` - Delete product (admin)
  - Response: `{ success: true }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `POST /admin/products/upload` - Upload product image (admin)
  - Request: FormData with `file`
  - Response: `{ imageUrl }`
  - Auth: Required (admin)
  - Validation: Image format, size limit
  - Errors: 400 (invalid file), 401, 403

- [ ] `PATCH /admin/products/:productId/status` - Toggle product status (admin)
  - Request: `{ isActive }`
  - Response: `{ id, isActive }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

## Admin Order Endpoints

**Base URL:** `/api/admin/orders`

- [ ] `GET /admin/orders` - List all orders (admin)
  - Query Params: `page, pageSize, status, search`
  - Response: `{ orders: [...], totalCount }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/orders/:orderId` - Get order details (admin)
  - Response: Full order details with customer info, items, tracking
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `PATCH /admin/orders/:orderId/status` - Update order status (admin)
  - Request: `{ status }`
  - Response: `{ id, status, updatedAt }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403, 404

- [ ] `PATCH /admin/orders/:orderId/assign-courier` - Assign courier (admin)
  - Request: `{ courierId, trackingNumber }`
  - Response: `{ orderId, courierId, trackingNumber }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403, 404

- [ ] `GET /admin/orders/export` - Export orders (admin)
  - Query Params: `format (csv/excel), filters`
  - Response: CSV/Excel file (Blob)
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/orders/statistics` - Get order statistics (admin)
  - Response: `{ totalOrders, totalRevenue, pendingCount, shipmentCount, ... }`
  - Auth: Required (admin)
  - Errors: 401, 403

## Admin User Endpoints

**Base URL:** `/api/admin/users`

- [ ] `GET /admin/users` - List all users (admin)
  - Query Params: `page, pageSize, search, role`
  - Response: `{ users: [...], totalCount }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/users/:userId` - Get user details (admin)
  - Response: `{ id, name, email, phone, role, createdAt, lastLogin, orders, totalSpent }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `PUT /admin/users/:userId` - Update user (admin)
  - Request: `{ name, phone, email }`
  - Response: `{ id, ... }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403, 404

- [ ] `PATCH /admin/users/:userId/role` - Update user role (admin)
  - Request: `{ role }`
  - Response: `{ id, role }`
  - Auth: Required (admin)
  - Validation: Valid role value
  - Errors: 400, 401, 403, 404

- [ ] `PATCH /admin/users/:userId/status` - Toggle user status (admin)
  - Request: `{ isActive }`
  - Response: `{ id, isActive }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `DELETE /admin/users/:userId` - Delete user (admin)
  - Response: `{ success: true }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `GET /admin/users/statistics` - Get user statistics (admin)
  - Response: `{ totalUsers, activeUsers, newUsersThisMonth, ... }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/users/:userId/activity-log` - Get user activity (admin)
  - Query Params: `page, pageSize`
  - Response: `{ activities: [...], totalCount }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `POST /admin/users/:userId/notify` - Send notification (admin)
  - Request: `{ subject, message, type (email/sms/both) }`
  - Response: `{ success: true, notificationId }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403, 404

## Admin Courier Endpoints

**Base URL:** `/api/admin/couriers`

- [ ] `GET /admin/couriers` - List all couriers (admin)
  - Query Params: `page, pageSize`
  - Response: `{ couriers: [...], totalCount }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/couriers/:courierId` - Get courier details (admin)
  - Response: `{ id, name, serviceProvider, email, phone, capacity, assignedOrders }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `POST /admin/couriers` - Create courier (admin)
  - Request: `{ name, serviceProvider, email, phone, maxCapacity }`
  - Response: `{ id, ... }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403

- [ ] `PUT /admin/couriers/:courierId` - Update courier (admin)
  - Request: `{ name, email, phone, maxCapacity }`
  - Response: `{ id, ... }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403, 404

- [ ] `DELETE /admin/couriers/:courierId` - Delete courier (admin)
  - Response: `{ success: true }`
  - Auth: Required (admin)
  - Errors: 401, 403, 404

- [ ] `GET /admin/couriers/available` - Get available couriers (admin)
  - Response: `{ couriers: [] }`
  - Logic: Only couriers not at max capacity
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `PATCH /admin/couriers/:courierId/capacity` - Update courier capacity (admin)
  - Request: `{ currentLoadCapacity }`
  - Response: `{ id, currentLoadCapacity }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403, 404

## Admin Dashboard Endpoints

**Base URL:** `/api/admin/dashboard`

- [ ] `GET /admin/dashboard/stats` - Get dashboard statistics
  - Response: `{ totalProducts, totalOrders, totalRevenue, pendingOrders, activeUsers }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/dashboard/sales-trend` - Get sales trend
  - Query Params: `period (daily/weekly/monthly)`
  - Response: `{ period, data: [{ date, sales }] }`
  - Auth: Required (admin)
  - Errors: 400, 401, 403

- [ ] `GET /admin/dashboard/top-products` - Get top selling products
  - Query Params: `limit`
  - Response: `{ products: [{ id, name, sales, revenue }] }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/dashboard/category-sales` - Get category-wise sales
  - Response: `{ categories: [{ name, sales, revenue }] }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/dashboard/order-stats` - Get order statistics
  - Query Params: `period`
  - Response: `{ totalOrders, completed, pending, cancelled, avgValue }`
  - Auth: Required (admin)
  - Errors: 401, 403

- [ ] `GET /admin/dashboard/revenue-breakdown` - Get revenue breakdown
  - Response: `{ byCategory, byPaymentMethod, byRegion }`
  - Auth: Required (admin)
  - Errors: 401, 403

## Implementation Order Recommendation

### Priority 1 (Critical - Week 1)
1. Authentication endpoints (all 10)
2. Product endpoints (all 8)
3. Order endpoints (all 10)
4. Payment endpoints (all 9)

### Priority 2 (High - Week 2)
5. Admin Product endpoints (all 7)
6. Admin Order endpoints (all 6)
7. Admin Courier endpoints (all 7)

### Priority 3 (Medium - Week 3)
8. Admin Dashboard endpoints (all 6)
9. Admin User endpoints (all 9)

## Testing Checklist

- [ ] All endpoints respond with correct status codes
- [ ] All endpoints validate input data
- [ ] Authentication middleware works correctly
- [ ] Authorization checks work for admin endpoints
- [ ] Error responses follow standard format
- [ ] CORS is configured for frontend origin
- [ ] Rate limiting is implemented (if needed)
- [ ] Logging is in place for debugging
- [ ] Database transactions for order creation
- [ ] Email notifications are sent where needed

## Security Checklist

- [ ] All passwords are hashed (bcrypt or similar)
- [ ] JWT tokens have appropriate expiry
- [ ] Sensitive data is not logged
- [ ] Card details are tokenized, never stored
- [ ] Admin endpoints have proper role checks
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] CORS properly configured
- [ ] HTTPS enforced in production
- [ ] Rate limiting on sensitive endpoints (login, etc.)

## Database Models Needed

1. **User** - id, name, email, phone, password, role, addresses, createdAt, updatedAt
2. **Product** - id, name, description, price, cost, category, images, stock, rating, isActive
3. **Order** - id, orderNumber, userId, items, totalAmount, status, shippingAddress, trackingNumber
4. **OrderItem** - id, orderId, productId, quantity, price
5. **Payment** - id, orderId, amount, method, status, transactionId
6. **Courier** - id, name, serviceProvider, email, phone, maxCapacity, currentLoad
7. **Category** - id, name, description, imageUrl
8. **Review** - id, productId, userId, rating, title, comment, createdAt

---

**Last Updated:** 2024
**Total Endpoints:** 72
**Status:** Ready for Implementation
