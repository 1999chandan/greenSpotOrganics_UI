import React, { useState } from 'react';

export default function Orders() {
    const [orders] = useState([
        { id: 1, product: 'Organic Compost', quantity: 2, price: 45.99, date: '2024-01-15', status: 'Delivered' },
        { id: 2, product: 'Fertilizer Mix', quantity: 1, price: 32.50, date: '2024-01-10', status: 'Processing' },
        { id: 3, product: 'Garden Soil', quantity: 3, price: 28.99, date: '2024-01-05', status: 'Shipped' },
    ]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">#{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.product}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.quantity}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">${order.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.date}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}