import React, { useState } from 'react';
import UserLayout from '../components/layout/UserLayout';
import { ArrowLeft, MapPin, Truck, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TrackShipment() {
    const navigate = useNavigate();
    const [trackingNumber, setTrackingNumber] = useState('FDX1234567890');
    const [searchInput, setSearchInput] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Mock tracking data
    const trackingData = {
        'FDX1234567890': {
            orderNumber: '#12345',
            carrier: 'FedEx',
            status: 'in-transit',
            estimatedDelivery: '2024-01-20',
            currentLocation: 'San Jose, CA',
            items: [
                { name: 'Organic Tomatoes', quantity: 2 },
                { name: 'Fresh Spinach', quantity: 1 }
            ],
            timeline: [
                { date: '2024-01-15', time: '10:00 AM', event: 'Order Placed', location: 'San Francisco, CA', status: 'completed' },
                { date: '2024-01-15', time: '2:30 PM', event: 'Order Confirmed', location: 'San Francisco, CA', status: 'completed' },
                { date: '2024-01-16', time: '8:00 AM', event: 'Shipped from Warehouse', location: 'San Francisco, CA', status: 'completed' },
                { date: '2024-01-17', time: '6:00 PM', event: 'Out for Delivery', location: 'San Jose, CA', status: 'active' },
                { date: '2024-01-20', time: 'TBD', event: 'Delivered', location: 'San Francisco, CA', status: 'pending' }
            ]
        },
        'UPS9876543210': {
            orderNumber: '#12346',
            carrier: 'UPS',
            status: 'shipped',
            estimatedDelivery: '2024-01-21',
            currentLocation: 'Los Angeles, CA',
            items: [
                { name: 'Organic Fertilizer', quantity: 1 }
            ],
            timeline: [
                { date: '2024-01-10', time: '11:00 AM', event: 'Order Placed', location: 'San Francisco, CA', status: 'completed' },
                { date: '2024-01-10', time: '3:00 PM', event: 'Order Confirmed', location: 'San Francisco, CA', status: 'completed' },
                { date: '2024-01-11', time: '9:00 AM', event: 'Shipped from Warehouse', location: 'San Francisco, CA', status: 'completed' },
                { date: '2024-01-17', time: '5:00 PM', event: 'In Transit', location: 'Los Angeles, CA', status: 'active' },
                { date: '2024-01-21', time: 'TBD', event: 'Delivered', location: 'San Francisco, CA', status: 'pending' }
            ]
        }
    };

    const currentTracking = trackingData[trackingNumber] || trackingData['FDX1234567890'];

    const handleSearch = (e) => {
        e.preventDefault();
        if (trackingData[searchInput]) {
            setTrackingNumber(searchInput);
            setSearchInput('');
            setShowSearch(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle size={20} className="text-green-600" />;
            case 'active':
                return <Clock size={20} className="text-blue-600 animate-pulse" />;
            case 'pending':
                return <Clock size={20} className="text-gray-400" />;
            default:
                return <Package size={20} className="text-gray-400" />;
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            'in-transit': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Transit' },
            'shipped': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Shipped' },
            'delivered': { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
            'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Processing' }
        };
        return statusConfig[status] || statusConfig['pending'];
    };

    const badge = getStatusBadge(currentTracking.status);

    return (
        <UserLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Track Your Shipment</h1>
                        <p className="text-gray-600 mt-2">Monitor your order status and delivery updates</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200"
                        >
                            <span className="text-gray-700 font-medium">Tracking #: {trackingNumber}</span>
                            {showSearch ? '✕' : '✎'}
                        </button>
                        
                        {showSearch && (
                            <form onSubmit={handleSearch} className="mt-4 flex gap-2">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Enter tracking number..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                                >
                                    Search
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Tracking Info */}
                    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
                        {/* Order & Status */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-200">
                            <div>
                                <p className="text-gray-600 text-sm mb-2">Order Number</p>
                                <h2 className="text-2xl font-bold text-gray-900">{currentTracking.orderNumber}</h2>
                            </div>
                            <div className={`mt-4 sm:mt-0 px-4 py-2 ${badge.bg} ${badge.text} rounded-full inline-block w-fit`}>
                                <p className="font-semibold text-sm">{badge.label}</p>
                            </div>
                        </div>

                        {/* Carrier & Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-6 border-b border-gray-200">
                            <div>
                                <p className="text-gray-600 text-sm mb-2">Carrier</p>
                                <div className="flex items-center gap-2">
                                    <Truck size={20} className="text-green-600" />
                                    <p className="font-semibold text-gray-900">{currentTracking.carrier}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm mb-2">Current Location</p>
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-green-600" />
                                    <p className="font-semibold text-gray-900">{currentTracking.currentLocation}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm mb-2">Est. Delivery</p>
                                <p className="font-semibold text-gray-900">{new Date(currentTracking.estimatedDelivery).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
                            <div className="space-y-2">
                                {currentTracking.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                        <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-8">Delivery Timeline</h3>
                        
                        <div className="space-y-6">
                            {currentTracking.timeline.map((event, idx) => (
                                <div key={idx} className="flex gap-4">
                                    {/* Timeline Icon */}
                                    <div className="flex flex-col items-center">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                            event.status === 'completed' ? 'bg-green-100' : event.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                                        }`}>
                                            {getStatusIcon(event.status)}
                                        </div>
                                        {idx < currentTracking.timeline.length - 1 && (
                                            <div className={`w-1 h-12 mt-2 ${
                                                event.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                                            }`}></div>
                                        )}
                                    </div>

                                    {/* Event Details */}
                                    <div className="pb-6 flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{event.event}</h4>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    <span className="font-medium">{event.date}</span> at <span className="font-medium">{event.time}</span>
                                                </p>
                                                <div className="flex items-center gap-1 text-gray-700 text-sm">
                                                    <MapPin size={14} />
                                                    {event.location}
                                                </div>
                                            </div>
                                            {event.status === 'active' && (
                                                <div className="mt-3 sm:mt-0 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                                    Current
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                        <p className="text-sm text-blue-800">
                            For more information about your shipment or to contact customer service, please visit our Help Center or call 1-800-ORGANIC.
                        </p>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
