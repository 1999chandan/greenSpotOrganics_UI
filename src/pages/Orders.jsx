import React, { useState } from 'react';
import UserLayout from '../components/layout/UserLayout';
import { ChevronDown, Truck, Clock, CheckCircle, AlertCircle, MapPin, Package } from 'lucide-react';

export default function Orders() {
    const [orders] = useState([
        {
            id: 'ORD-001',
            orderNumber: '#12345',
            items: [
                { name: 'Organic Tomatoes', quantity: 2, price: 24.99 },
                { name: 'Fresh Spinach', quantity: 1, price: 12.50 }
            ],
            totalAmount: 62.48,
            date: '2024-01-15',
            status: 'delivered',
            courier: 'FedEx',
            trackingNumber: 'FDX1234567890',
            estimatedDelivery: '2024-01-18',
            deliveredDate: '2024-01-18'
        },
        {
            id: 'ORD-002',
            orderNumber: '#12346',
            items: [
                { name: 'Organic Fertilizer', quantity: 1, price: 32.50 }
            ],
            totalAmount: 32.50,
            date: '2024-01-10',
            status: 'shipped',
            courier: 'UPS',
            trackingNumber: 'UPS9876543210',
            estimatedDelivery: '2024-01-20',
            deliveredDate: null
        },
        {
            id: 'ORD-003',
            orderNumber: '#12347',
            items: [
                { name: 'Garden Soil', quantity: 3, price: 28.99 }
            ],
            totalAmount: 86.97,
            date: '2024-01-05',
            status: 'processing',
            courier: null,
            trackingNumber: null,
            estimatedDelivery: '2024-01-22',
            deliveredDate: null
        },
        {
            id: 'ORD-004',
            orderNumber: '#12348',
            items: [
                { name: 'Organic Apples', quantity: 5, price: 15.99 }
            ],
            totalAmount: 79.95,
            date: '2024-01-01',
            status: 'cancelled',
            courier: null,
            trackingNumber: null,
            estimatedDelivery: null,
            deliveredDate: null,
            cancelReason: 'Out of stock'
        }
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const getStatusColor = (status) => {
        switch(status) {
            case 'delivered': return { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle };
            case 'shipped': return { bg: 'bg-blue-100', text: 'text-blue-800', icon: Truck };
            case 'processing': return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock };
            case 'cancelled': return { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle };
            default: return { bg: 'bg-gray-100', text: 'text-gray-800', icon: Package };
        }
    };

    const getStatusLabel = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const filteredOrders = filterStatus === 'all' 
        ? orders 
        : orders.filter(order => order.status === filterStatus);

    return (
        <UserLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Orders</h1>
                        <p className="text-gray-600 mt-2">Track and manage your orders</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="bg-white rounded-lg shadow-md border-b border-gray-200 mb-8">
                        <div className="flex flex-wrap gap-2 sm:gap-4 px-4 sm:px-6 py-4">
                            {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`pb-2 px-3 sm:px-4 border-b-2 transition font-medium text-sm ${
                                        filterStatus === status
                                            ? 'border-green-600 text-green-600'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {status === 'all' ? 'All Orders' : getStatusLabel(status)}
                                    <span className="ml-2 text-xs">({orders.filter(o => status === 'all' ? true : o.status === status).length})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orders List */}
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <Package size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-600">You don't have any orders with this status.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map(order => {
                                const statusInfo = getStatusColor(order.status);
                                const StatusIcon = statusInfo.icon;
                                
                                return (
                                    <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        {/* Order Summary */}
                                        <div
                                            onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                                            className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                                                            <StatusIcon size={16} className={statusInfo.text} />
                                                            <span className={`text-sm font-medium ${statusInfo.text}`}>
                                                                {getStatusLabel(order.status)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-2">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                                                    <div className="text-sm text-gray-500">
                                                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                                                    <ChevronDown
                                                        size={20}
                                                        className={`text-gray-400 transition transform ${selectedOrder?.id === order.id ? 'rotate-180' : ''}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Details - Expanded */}
                                        {selectedOrder?.id === order.id && (
                                            <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6 space-y-6">
                                                {/* Items */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                                                    <div className="space-y-3">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                                                                <div>
                                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                                </div>
                                                                <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Tracking Info */}
                                                {(order.status === 'shipped' || order.status === 'delivered') && (
                                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                            <Truck size={18} />
                                                            Shipping Details
                                                        </h4>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-sm text-gray-600 mb-1">Courier</p>
                                                                <p className="font-medium text-gray-900">{order.courier}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                                                                <p className="font-medium text-gray-900 font-mono">{order.trackingNumber}</p>
                                                            </div>
                                                            {order.status === 'delivered' && order.deliveredDate && (
                                                                <div>
                                                                    <p className="text-sm text-gray-600 mb-1">Delivered On</p>
                                                                    <p className="font-medium text-gray-900">{new Date(order.deliveredDate).toLocaleDateString()}</p>
                                                                </div>
                                                            )}
                                                            {order.status === 'shipped' && (
                                                                <div>
                                                                    <p className="text-sm text-gray-600 mb-1">Est. Delivery</p>
                                                                    <p className="font-medium text-gray-900">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Cancellation Reason */}
                                                {order.status === 'cancelled' && order.cancelReason && (
                                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                                        <p className="text-sm text-red-800"><strong>Cancellation Reason:</strong> {order.cancelReason}</p>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="flex gap-4 pt-4 border-t border-gray-200">
                                                    {order.status === 'shipped' && (
                                                        <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium flex items-center justify-center gap-2">
                                                            <MapPin size={18} />
                                                            <span>Track Shipment</span>
                                                        </button>
                                                    )}
                                                    {order.status === 'delivered' && (
                                                        <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                                                            Leave Review
                                                        </button>
                                                    )}
                                                    <button className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg transition font-medium">
                                                        View Invoice
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}