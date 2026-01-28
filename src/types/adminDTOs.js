/**
 * Data Transfer Objects (DTOs) for admin features
 * Defines the expected structure for API requests/responses
 */

// Product DTO
export const ProductDTO = {
  id: '',
  name: '',
  description: '',
  price: 0,
  stock: 0,
  sku: '',
  category: '',
  image: '',
  images: [],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Order DTO
export const OrderDTO = {
  id: '',
  orderNumber: '',
  customerId: '',
  customerName: '',
  email: '',
  phone: '',
  totalAmount: 0,
  status: 'pending', // pending, processing, shipped, delivered, cancelled
  items: [
    {
      productId: '',
      productName: '',
      quantity: 0,
      price: 0,
    },
  ],
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  courierId: null,
  trackingNumber: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Courier DTO
export const CourierDTO = {
  id: '',
  name: '',
  email: '',
  phone: '',
  serviceProvider: '', // e.g., 'FedEx', 'DHL', 'Local'
  currentLoadCapacity: 0,
  maxLoadCapacity: 0,
  isActive: true,
  assignedOrders: [],
  createdAt: new Date(),
};

// Dashboard Stats DTO
export const DashboardStatsDTO = {
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
  pendingOrders: 0,
  activeUsers: 0,
  recentOrders: [],
};
