import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { Eye, EyeOff, AlertCircle, CheckCircle, Leaf } from 'lucide-react';

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Validation rules
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const validateMobileNumber = (phone) => {
        const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const getPasswordStrength = (password) => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return Math.min(strength, 5);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'fullName':
                if (!value.trim()) {
                    newErrors.fullName = 'Full name is required';
                } else if (value.trim().length < 2) {
                    newErrors.fullName = 'Name must be at least 2 characters';
                } else {
                    delete newErrors.fullName;
                }
                break;

            case 'email':
                if (!value.trim()) {
                    newErrors.email = 'Email is required';
                } else if (!validateEmail(value)) {
                    newErrors.email = 'Please enter a valid email address';
                } else {
                    delete newErrors.email;
                }
                break;

            case 'mobileNumber':
                if (!value.trim()) {
                    newErrors.mobileNumber = 'Mobile number is required';
                } else if (!validateMobileNumber(value)) {
                    newErrors.mobileNumber = 'Please enter a valid phone number';
                } else {
                    delete newErrors.mobileNumber;
                }
                break;

            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required';
                } else if (!validatePassword(value)) {
                    newErrors.password = 'Password must be at least 8 characters';
                } else {
                    delete newErrors.password;
                }
                if (formData.confirmPassword && value !== formData.confirmPassword) {
                    newErrors.confirmPassword = 'Passwords do not match';
                } else if (formData.confirmPassword && value === formData.confirmPassword) {
                    delete newErrors.confirmPassword;
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    newErrors.confirmPassword = 'Confirm password is required';
                } else if (value !== formData.password) {
                    newErrors.confirmPassword = 'Passwords do not match';
                } else {
                    delete newErrors.confirmPassword;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        Object.keys(formData).forEach(field => {
            validateField(field, formData[field]);
        });

        // Check if all fields are valid
        const allTouched = {
            fullName: true,
            email: true,
            mobileNumber: true,
            password: true,
            confirmPassword: true
        };
        setTouched(allTouched);

        // If any errors exist, don't submit
        if (Object.keys(errors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            // Mock signup - dispatch login to store and redirect
            const newUser = {
                id: Math.random(),
                name: formData.fullName,
                email: formData.email,
                phone: formData.mobileNumber,
                role: 'user'
            };

            dispatch(loginSuccess({
                user: newUser,
                token: 'mock-jwt-token-' + Date.now(),
                role: 'user'
            }));

            setSuccessMessage('Account created successfully! Redirecting...');
            
            setTimeout(() => {
                navigate('/');
            }, 2000);

            setIsSubmitting(false);
        }, 1000);
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const passwordStrengthColor = 
        passwordStrength <= 2 ? 'bg-red-500' :
        passwordStrength <= 3 ? 'bg-yellow-500' :
        'bg-green-500';
    
    const passwordStrengthLabel = 
        passwordStrength <= 2 ? 'Weak' :
        passwordStrength <= 3 ? 'Fair' :
        'Strong';

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Leaf size={32} className="text-green-600" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Green Spot</h1>
                    </div>
                    <p className="text-gray-600">Join our organic community</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 sm:p-8">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                            <CheckCircle size={20} className="text-green-600" />
                            <p className="text-sm text-green-800 font-medium">{successMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your full name"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                                    touched.fullName && errors.fullName
                                        ? 'border-red-400 focus:ring-red-300 bg-red-50'
                                        : touched.fullName && !errors.fullName
                                        ? 'border-green-400 focus:ring-green-300'
                                        : 'border-gray-300 focus:ring-green-300'
                                }`}
                            />
                            {touched.fullName && errors.fullName && (
                                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    {errors.fullName}
                                </div>
                            )}
                            {touched.fullName && !errors.fullName && formData.fullName && (
                                <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                                    <CheckCircle size={16} />
                                    Looks good
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                                    touched.email && errors.email
                                        ? 'border-red-400 focus:ring-red-300 bg-red-50'
                                        : touched.email && !errors.email
                                        ? 'border-green-400 focus:ring-green-300'
                                        : 'border-gray-300 focus:ring-green-300'
                                }`}
                            />
                            {touched.email && errors.email && (
                                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    {errors.email}
                                </div>
                            )}
                            {touched.email && !errors.email && formData.email && (
                                <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                                    <CheckCircle size={16} />
                                    Email valid
                                </div>
                            )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your phone number"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition ${
                                    touched.mobileNumber && errors.mobileNumber
                                        ? 'border-red-400 focus:ring-red-300 bg-red-50'
                                        : touched.mobileNumber && !errors.mobileNumber
                                        ? 'border-green-400 focus:ring-green-300'
                                        : 'border-gray-300 focus:ring-green-300'
                                }`}
                            />
                            {touched.mobileNumber && errors.mobileNumber && (
                                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    {errors.mobileNumber}
                                </div>
                            )}
                            {touched.mobileNumber && !errors.mobileNumber && formData.mobileNumber && (
                                <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                                    <CheckCircle size={16} />
                                    Number valid
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Create a strong password"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition pr-10 ${
                                        touched.password && errors.password
                                            ? 'border-red-400 focus:ring-red-300 bg-red-50'
                                            : touched.password && !errors.password
                                            ? 'border-green-400 focus:ring-green-300'
                                            : 'border-gray-300 focus:ring-green-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 flex-1 rounded-full transition ${
                                                    i < passwordStrength ? passwordStrengthColor : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        Password strength: <span className="font-semibold text-gray-800">{passwordStrengthLabel}</span>
                                    </p>
                                </div>
                            )}

                            {touched.password && errors.password && (
                                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    {errors.password}
                                </div>
                            )}
                            {touched.password && !errors.password && formData.password && (
                                <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                                    <CheckCircle size={16} />
                                    Password meets requirements
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Re-enter your password"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition pr-10 ${
                                        touched.confirmPassword && errors.confirmPassword
                                            ? 'border-red-400 focus:ring-red-300 bg-red-50'
                                            : touched.confirmPassword && !errors.confirmPassword
                                            ? 'border-green-400 focus:ring-green-300'
                                            : 'border-gray-300 focus:ring-green-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle size={16} />
                                    {errors.confirmPassword}
                                </div>
                            )}
                            {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                                <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                                    <CheckCircle size={16} />
                                    Passwords match
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || Object.keys(errors).length > 0 || !formData.fullName || !formData.email || !formData.mobileNumber || !formData.password || !formData.confirmPassword}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-700 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-green-600 hover:text-green-700 transition">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}