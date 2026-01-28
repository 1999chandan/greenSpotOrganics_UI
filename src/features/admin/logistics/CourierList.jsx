import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCouriersStart,
  fetchCouriersSuccess,
  fetchCouriersFailure,
} from './courierSlice';
import courierAPI from './courierAPI';
import { Truck, Edit2, MoreVertical } from 'lucide-react';

/**
 * CourierList - Displays all courier partners with their capacity and assignments
 */
const CourierList = () => {
  const dispatch = useDispatch();
  const { couriers, loading, error, totalCount } = useSelector((state) => state.courier);

  useEffect(() => {
    loadCouriers();
  }, []);

  const loadCouriers = async () => {
    dispatch(fetchCouriersStart());
    try {
      const data = await courierAPI.fetchCouriers();
      dispatch(fetchCouriersSuccess(data));
    } catch (err) {
      dispatch(fetchCouriersFailure(err.message));
    }
  };

  const getCapacityColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage < 50) return 'bg-green-100 text-green-800';
    if (percentage < 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Courier Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Truck size={18} />
          Add Courier
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-6 text-center text-gray-500">
          Loading couriers...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {/* Grid View */}
      {!loading && couriers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {couriers.map((courier) => (
            <div
              key={courier.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {courier.name}
                  </h3>
                  <p className="text-sm text-gray-500">{courier.serviceProvider}</p>
                </div>
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Contact Info */}
              <div className="mb-4 space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Email:</span>
                  <br />
                  <span className="text-gray-900">{courier.email}</span>
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span>
                  <br />
                  <span className="text-gray-900">{courier.phone}</span>
                </p>
              </div>

              {/* Capacity */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">Load Capacity</p>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${getCapacityColor(
                      courier.currentLoadCapacity,
                      courier.maxLoadCapacity
                    )}`}
                  >
                    {courier.currentLoadCapacity}/{courier.maxLoadCapacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(courier.currentLoadCapacity / courier.maxLoadCapacity) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    courier.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {courier.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Assigned Orders */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Assigned Orders: {courier.assignedOrders?.length || 0}
                </p>
                {courier.assignedOrders && courier.assignedOrders.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {courier.assignedOrders.slice(0, 3).map((orderId) => (
                      <span
                        key={orderId}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        #{orderId}
                      </span>
                    ))}
                    {courier.assignedOrders.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        +{courier.assignedOrders.length - 3}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No orders assigned</p>
                )}
              </div>

              {/* Action Button */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                <Edit2 size={16} />
                Edit Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && couriers.length === 0 && (
        <div className="p-12 text-center">
          <Truck size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No couriers found</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Add Your First Courier
          </button>
        </div>
      )}
    </div>
  );
};

export default CourierList;
