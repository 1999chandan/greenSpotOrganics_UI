import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Organic Fertilizer', price: 29.99, quantity: 2, image: '/product1.jpg' },
        { id: 2, name: 'Garden Seeds Pack', price: 15.99, quantity: 1, image: '/product2.jpg' },
    ]);

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeItem(id);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            ));
        }
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-600 text-center py-12">Your cart is empty</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 p-6 border-b last:border-b-0">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-green-600 font-bold">${item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 rounded">
                                                <Minus size={18} />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 rounded">
                                                <Plus size={18} />
                                            </button>
                                            <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (10%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}