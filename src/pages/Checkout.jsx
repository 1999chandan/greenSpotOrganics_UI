import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout';
import { ShoppingCart, MapPin, Truck, CreditCard, CheckCircle, X } from 'lucide-react';

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items);
    const cartTotal = useSelector(state => state.cart.totalPrice);
    
    const [step, setStep] = useState('address');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [selectedShipping, setSelectedShipping] = useState('standard');
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const [addresses] = useState([
        { id: 1, type: 'Home', street: '123 Oak Street', city: 'San Francisco, CA 94105', default: true },
        { id: 2, type: 'Work', street: '456 Market Street', city: 'San Francisco, CA 94103', default: false }
    ]);

    const shippingOptions = [
        { id: 'standard', label: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
        { id: 'express', label: 'Express Shipping', price: 14.99, days: '2-3 business days' },
        { id: 'overnight', label: 'Overnight Shipping', price: 29.99, days: 'Next business day' }
    ];

    const shippingCost = shippingOptions.find(opt => opt.id === selectedShipping)?.price || 5.99;
    const tax = (cartTotal + shippingCost) * 0.08;
    const finalTotal = cartTotal + shippingCost + tax;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
        setTimeout(() => {
            navigate('/orders');
        }, 3000);
    };

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <UserLayout>
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                            <p className="text-gray-600 mb-6">Add items to your cart before checking out.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    if (orderPlaced) {
        return (
            <UserLayout>
                <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
                        <div className="mb-6">
                            <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
                            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
                            <p className="text-gray-600 mb-4">Thank you for your purchase. Your order confirmation has been sent to your email.</p>
                            <p className="text-sm text-gray-500">Redirecting to orders page...</p>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handlePlaceOrder} className="space-y-6">
                                {/* Step Indicator */}
                                <div className="flex gap-4 mb-8">
                                    {[
                                        { id: 'address', label: 'Address', icon: MapPin },
                                        { id: 'shipping', label: 'Shipping', icon: Truck },
                                        { id: 'payment', label: 'Payment', icon: CreditCard }
                                    ].map(s => {
                                        const StepIcon = s.icon;
                                        const isActive = step === s.id;
                                        const isCompleted = ['address', 'shipping', 'payment'].indexOf(s.id) < ['address', 'shipping', 'payment'].indexOf(step);
                                        
                                        return (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => setStep(s.id)}
                                                className={`flex-1 p-4 rounded-lg border-2 transition text-center ${
                                                    isActive ? 'border-green-600 bg-green-50' : isCompleted ? 'border-green-600 bg-green-100' : 'border-gray-200 bg-white'
                                                }`}
                                            >
                                                <StepIcon size={24} className={`mx-auto mb-2 ${isActive || isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                                                <p className={`text-sm font-medium ${isActive || isCompleted ? 'text-green-600' : 'text-gray-600'}`}>{s.label}</p>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Address Step */}
                                {step === 'address' && (
                                    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Delivery Address</h2>
                                        
                                        <div className="space-y-3">
                                            {addresses.map(addr => (
                                                <label key={addr.id} className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-green-300 transition"
                                                    style={{ borderColor: selectedAddress === addr.id ? '#16a34a' : '#e5e7eb' }}>
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        value={addr.id}
                                                        checked={selectedAddress === addr.id}
                                                        onChange={(e) => setSelectedAddress(parseInt(e.target.value))}
                                                        className="mt-1"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{addr.type}</p>
                                                        <p className="text-gray-600">{addr.street}</p>
                                                        <p className="text-gray-600">{addr.city}</p>
                                                        {addr.default && <span className="text-xs text-green-600 font-semibold mt-2 inline-block">Default Address</span>}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStep('shipping')}
                                            className="w-full mt-6 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                                        >
                                            Continue to Shipping
                                        </button>
                                    </div>
                                )}

                                {/* Shipping Step */}
                                {step === 'shipping' && (
                                    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Shipping Method</h2>
                                        
                                        <div className="space-y-3">
                                            {shippingOptions.map(opt => (
                                                <label key={opt.id} className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-green-300 transition"
                                                    style={{ borderColor: selectedShipping === opt.id ? '#16a34a' : '#e5e7eb' }}>
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        value={opt.id}
                                                        checked={selectedShipping === opt.id}
                                                        onChange={(e) => setSelectedShipping(e.target.value)}
                                                        className="mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900">{opt.label}</p>
                                                        <p className="text-gray-600 text-sm">{opt.days}</p>
                                                    </div>
                                                    <p className="font-bold text-gray-900">${opt.price.toFixed(2)}</p>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep('address')}
                                                className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition font-medium"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setStep('payment')}
                                                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                                            >
                                                Continue to Payment
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Payment Step */}
                                {step === 'payment' && (
                                    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="cardName"
                                                placeholder="Cardholder Name"
                                                value={formData.cardName}
                                                onChange={handleChange}
                                                required
                                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="Card Number"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                required
                                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                placeholder="MM/YY"
                                                value={formData.expiryDate}
                                                onChange={handleChange}
                                                required
                                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                            <input
                                                type="text"
                                                name="cvv"
                                                placeholder="CVV"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                required
                                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                            <p className="text-sm text-blue-800">
                                                <strong>Demo Mode:</strong> This is a test checkout. Use any card details to complete the order.
                                            </p>
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep('shipping')}
                                                className="flex-1 px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition font-medium"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                                            >
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                                
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-gray-900">${shippingCost.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (8%)</span>
                                        <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-green-600">${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
