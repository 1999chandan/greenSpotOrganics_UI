import React, { useState } from 'react';
import UserLayout from '../components/layout/UserLayout';
import { MapPin, Plus, Edit2, Trash2, CheckCircle, X } from 'lucide-react';

export default function Addresses() {
    const [addresses, setAddresses] = useState([
        { id: 1, type: 'Home', street: '123 Oak Street', city: 'San Francisco', state: 'CA', zipCode: '94105', isDefault: true },
        { id: 2, type: 'Work', street: '456 Market Street', city: 'San Francisco', state: 'CA', zipCode: '94103', isDefault: false }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOpenModal = (address = null) => {
        if (address) {
            setEditingId(address.id);
            setFormData(address);
        } else {
            setEditingId(null);
            setFormData({
                type: 'Home',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                isDefault: false
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingId) {
            // Update existing address
            setAddresses(addresses.map(addr =>
                addr.id === editingId ? { ...addr, ...formData } : addr
            ));
        } else {
            // Add new address
            const newAddress = {
                id: Math.max(...addresses.map(a => a.id), 0) + 1,
                ...formData
            };
            setAddresses([...addresses, newAddress]);
        }
        
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleSetDefault = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    return (
        <UserLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Addresses</h1>
                            <p className="text-gray-600 mt-2">Manage your delivery addresses</p>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                        >
                            <Plus size={20} />
                            <span>Add Address</span>
                        </button>
                    </div>

                    {/* Addresses Grid */}
                    {addresses.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses found</h3>
                            <p className="text-gray-600 mb-6">Add your first address to get started.</p>
                            <button
                                onClick={() => handleOpenModal()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                            >
                                <Plus size={20} />
                                <span>Add Address</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.map(address => (
                                <div key={address.id} className="bg-white rounded-lg shadow-md p-6 relative">
                                    {/* Default Badge */}
                                    {address.isDefault && (
                                        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                            <CheckCircle size={14} />
                                            Default
                                        </div>
                                    )}

                                    {/* Address Type */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">{address.type}</h3>

                                    {/* Address Details */}
                                    <div className="space-y-2 mb-6">
                                        <p className="text-gray-700 flex items-start gap-2">
                                            <MapPin size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>{address.street}</span>
                                        </p>
                                        <p className="text-gray-700 ml-8">
                                            {address.city}, {address.state} {address.zipCode}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={() => handleOpenModal(address)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium"
                                        >
                                            <Edit2 size={16} />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            disabled={addresses.length === 1}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Trash2 size={16} />
                                            <span>Delete</span>
                                        </button>
                                        {!address.isDefault && (
                                            <button
                                                onClick={() => handleSetDefault(address.id)}
                                                className="flex-1 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium"
                                            >
                                                Set Default
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingId ? 'Edit Address' : 'Add New Address'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                >
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    placeholder="Enter street address"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    placeholder="Zip Code"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                />
                            </div>

                            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-600"
                                />
                                <span className="text-sm font-medium text-gray-700">Set as default address</span>
                            </label>

                            {/* Modal Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                                >
                                    {editingId ? 'Update' : 'Add'} Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </UserLayout>
    );
}
