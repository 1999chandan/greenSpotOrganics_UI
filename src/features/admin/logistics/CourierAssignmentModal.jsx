import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  assignCourierStart,
  assignCourierSuccess,
  assignCourierFailure,
} from '../orders/orderAdminSlice';
import { updateCourierSuccess } from './courierSlice';
import orderAdminAPI from '../orders/orderAdminAPI';
import courierAPI from './courierAPI';
import { Truck, X } from 'lucide-react';

/**
 * CourierAssignmentModal - Modal to assign a courier to an order
 * Shows available couriers and allows tracking number assignment
 */
const CourierAssignmentModal = ({ order, onClose, onAssignSuccess }) => {
  const dispatch = useDispatch();

  const [couriers, setCouriers] = useState([]);
  const [selectedCourierId, setSelectedCourierId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAvailableCouriers();
  }, []);

  const loadAvailableCouriers = async () => {
    try {
      setLoading(true);
      const data = await courierAPI.getAvailableCouriers();
      setCouriers(data.couriers);
    } catch (err) {
      setError('Failed to load couriers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourierId) {
      setError('Please select a courier');
      return;
    }

    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      dispatch(assignCourierStart());
      const result = await orderAdminAPI.assignCourier(
        order.id,
        selectedCourierId,
        trackingNumber
      );
      dispatch(assignCourierSuccess(result));

      // Update courier's assigned orders
      const courier = couriers.find((c) => c.id === selectedCourierId);
      if (courier) {
        const updated = {
          ...courier,
          assignedOrders: [...(courier.assignedOrders || []), order.id],
          currentLoadCapacity: (courier.currentLoadCapacity || 0) + 1,
        };
        dispatch(updateCourierSuccess(updated));
      }

      onAssignSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to assign courier');
      dispatch(assignCourierFailure(err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Truck size={24} className="text-green-600" />
            Assign Courier
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Order Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-semibold text-gray-900">{order.orderNumber}</p>
            <p className="text-sm text-gray-500 mt-2">Customer</p>
            <p className="font-semibold text-gray-900">{order.customerName}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          {/* Courier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Courier *
            </label>
            {loading ? (
              <div className="text-center text-gray-500 py-4">
                Loading couriers...
              </div>
            ) : couriers.length > 0 ? (
              <select
                value={selectedCourierId}
                onChange={(e) => setSelectedCourierId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose a courier...</option>
                {couriers.map((courier) => (
                  <option key={courier.id} value={courier.id}>
                    {courier.name} - {courier.serviceProvider} (
                    {courier.currentLoadCapacity}/{courier.maxLoadCapacity})
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-center text-gray-500 py-4">
                No couriers available
              </div>
            )}
          </div>

          {/* Courier Details */}
          {selectedCourierId && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              {(() => {
                const selected = couriers.find((c) => c.id === selectedCourierId);
                return (
                  <>
                    <p className="text-sm font-semibold text-blue-900 mb-2">
                      {selected.name}
                    </p>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>Service Provider: {selected.serviceProvider}</p>
                      <p>
                        Capacity: {selected.currentLoadCapacity}/
                        {selected.maxLoadCapacity}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Tracking Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tracking Number *
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g., TRACK-123456789"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              This tracking number will be shared with the customer
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              {submitting ? 'Assigning...' : 'Assign Courier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourierAssignmentModal;
