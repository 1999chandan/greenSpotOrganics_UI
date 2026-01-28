import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout';
import { User, Mail, MapPin, Lock, LogOut, Heart, Package, Navigation } from 'lucide-react';

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [profileData, setProfileData] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'john@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Organic farming enthusiast',
        location: 'California, USA'
    });

    const [addresses] = useState([
        {
            id: 1,
            type: 'Home',
            street: '123 Oak Street',
            city: 'San Francisco, CA',
            zipCode: '94105',
            isDefault: true
        },
        {
            id: 2,
            type: 'Work',
            street: '456 Market Street',
            city: 'San Francisco, CA',
            zipCode: '94103',
            isDefault: false
        }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <UserLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Account</h1>
                            <p className="text-gray-600 mt-2">Manage your profile and preferences</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white rounded-lg shadow-md border-b border-gray-200 mb-8">
                        <div className="flex flex-wrap gap-4 px-6 py-4">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`pb-3 px-4 border-b-2 transition font-medium text-sm sm:text-base ${
                                    activeTab === 'personal'
                                        ? 'border-green-600 text-green-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <User size={18} />
                                    <span>Personal Info</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('addresses')}
                                className={`pb-3 px-4 border-b-2 transition font-medium text-sm sm:text-base ${
                                    activeTab === 'addresses'
                                        ? 'border-green-600 text-green-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    <span>Addresses</span>
                                </div>
                            </button>
                            <button
                                onClick={() => navigate('/orders')}
                                className="pb-3 px-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition font-medium text-sm sm:text-base"
                            >
                                <div className="flex items-center gap-2">
                                    <Package size={18} />
                                    <span>Orders</span>
                                </div>
                            </button>
                            <button
                                onClick={() => navigate('/wishlist')}
                                className="pb-3 px-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition font-medium text-sm sm:text-base"
                            >
                                <div className="flex items-center gap-2">
                                    <Heart size={18} />
                                    <span>Wishlist</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Personal Information Tab */}
                    {activeTab === 'personal' && (
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                                >
                                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={profileData.location}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-gray-100"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-gray-100"
                                        rows="4"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                                    <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium">
                                        <div className="flex items-center justify-center gap-2">
                                            <Lock size={18} />
                                            <span>Save Profile</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Addresses Tab */}
                    {activeTab === 'addresses' && (
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                                <button
                                    onClick={() => navigate('/addresses')}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                                >
                                    Add New Address
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {addresses.map(address => (
                                    <div key={address.id} className="border border-gray-300 rounded-lg p-6 relative">
                                        {address.isDefault && (
                                            <span className="absolute top-4 right-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                                Default
                                            </span>
                                        )}
                                        <h3 className="font-semibold text-gray-900 mb-3">{address.type}</h3>
                                        <p className="text-gray-700 mb-2">{address.street}</p>
                                        <p className="text-gray-700 mb-4">{address.city}, {address.zipCode}</p>
                                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                                            <button className="flex-1 px-3 py-2 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 transition font-medium">
                                                Edit
                                            </button>
                                            <button className="flex-1 px-3 py-2 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 transition font-medium">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}