import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [userType, setUserType] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(`Login as ${userType}:`, { email, password });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">GreenSpot</h1>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setUserType('user')}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                            userType === 'user'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setUserType('admin')}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                            userType === 'admin'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Admin
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition mb-4"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-green-600 font-semibold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
