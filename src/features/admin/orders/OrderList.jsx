import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  setStatusFilter,
  setCurrentPage,
} from './orderAdminSlice';
import orderAdminAPI from './orderAdminAPI';
import CourierAssignmentModal from '../logistics/CourierAssignmentModal';
import { Eye, Truck } from 'lucide-react';

/**
 * OrderList - Data table for viewing and managing orders
 * Features status filtering, pagination, courier assignment
 */
const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, filters, currentPage, pageSize, totalCount } = useSelector(
    (state) => state.orderAdmin
  );

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAssignCourier, setShowAssignCourier] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [currentPage, filters]);

  const loadOrders = async () => {
    dispatch(fetchOrdersStart());
    try {
      const filterObj = filters.status !== 'all' ? { status: filters.status } : {};
      const data = await orderAdminAPI.fetchOrders(filterObj, currentPage, pageSize);
      dispatch(fetchOrdersSuccess(data));
    } catch (err) {
      dispatch(fetchOrdersFailure(err.message));
    }
  };

  const handleStatusFilter = (status) => {
    dispatch(setStatusFilter(status));
  };

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
    { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  ];

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find((s) => s.value === status);
    return statusObj?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-4 border-b border-gray-200 flex gap-2 overflow-x-auto">
        {statusOptions.map((status) => (
          <button
            key={status.value}
            onClick={() => handleStatusFilter(status.value)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              filters.status === status.value
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-6 text-center text-gray-500">
          Loading orders...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {/* Table */}
      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Courier
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.trackingNumber ? (
                      <div>
                        <p className="font-medium">{order.trackingNumber}</p>
                        <p className="text-xs text-gray-500">Track: {order.trackingNumber}</p>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setViewDetails(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowAssignCourier(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                        title="Assign Courier"
                      >
                        <Truck size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && orders.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalCount > pageSize && (
        <div className="p-6 border-t border-gray-200 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(totalCount / pageSize) }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => dispatch(setCurrentPage(i + 1))}
              className={`px-4 py-2 rounded transition ${
                currentPage === i + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {viewDetails && (
        <OrderDetailsModal order={viewDetails} onClose={() => setViewDetails(null)} />
      )}

      {/* Courier Assignment Modal */}
      {showAssignCourier && (
        <CourierAssignmentModal
          order={selectedOrder}
          onClose={() => {
            setShowAssignCourier(false);
            setSelectedOrder(null);
          }}
          onAssignSuccess={() => {
            setShowAssignCourier(false);
            setSelectedOrder(null);
            loadOrders();
          }}
        />
      )}
    </div>
  );
};

/**
 * OrderDetailsModal - Shows detailed order information
 */
const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium text-gray-900">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-gray-900">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{order.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{order.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
            <div className="text-gray-700">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
