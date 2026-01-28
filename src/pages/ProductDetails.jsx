import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout';
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Mock product data
    const mockProducts = {
        '1': {
            id: 1,
            name: 'Organic Tomatoes',
            price: 12.99,
            originalPrice: 16.99,
            rating: 4.5,
            reviews: 248,
            inStock: true,
            description: 'Fresh, organic tomatoes grown without any pesticides or harmful chemicals. Perfectly ripe and ready for your kitchen.',
            images: [
                'https://images.unsplash.com/photo-1592924357228-91a4daadcccf?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1618164436241-4473940571cd?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1585518419857-fbc8667f5e3f?w=500&h=500&fit=crop'
            ],
            category: 'Vegetables',
            sku: 'ORG-TOM-001',
            weight: '1 kg',
            origin: 'California, USA',
            harvestDate: '2024-01-15',
            details: [
                '100% Organic - No pesticides or artificial fertilizers',
                'Fresh harvested within 24 hours of delivery',
                'Rich in vitamins A, C, and K',
                'Perfect for salads, cooking, and garnishing',
                'Sustainably grown by local farmers'
            ],
            reviews: [
                {
                    id: 1,
                    author: 'Sarah M.',
                    rating: 5,
                    date: '2024-01-14',
                    title: 'Best tomatoes I\'ve had in months!',
                    comment: 'Fresh, organic, and delicious. Highly recommend for any home cook.'
                },
                {
                    id: 2,
                    author: 'John D.',
                    rating: 4,
                    date: '2024-01-12',
                    title: 'Great quality',
                    comment: 'Good quality tomatoes. Arrived fresh and stayed fresh for a week.'
                }
            ],
            relatedProducts: [2, 3, 4]
        },
        '2': {
            id: 2,
            name: 'Fresh Spinach',
            price: 8.99,
            originalPrice: 11.99,
            rating: 4.7,
            reviews: 156,
            inStock: true,
            description: 'Tender, fresh organic spinach packed with nutrients. Great for salads, smoothies, and cooking.',
            images: [
                'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop'
            ],
            category: 'Vegetables',
            sku: 'ORG-SPN-001',
            weight: '250g',
            origin: 'Oregon, USA',
            details: ['Organic certified', 'High in Iron and Calcium', 'Perfect for salads', 'Vacuum sealed for freshness']
        },
        '3': {
            id: 3,
            name: 'Organic Apples',
            price: 15.99,
            originalPrice: 19.99,
            rating: 4.6,
            reviews: 312,
            inStock: true,
            description: 'Crispy, sweet organic apples perfect for snacking or cooking.',
            images: [
                'https://images.unsplash.com/photo-1560806647-919b6ddd3f3f?w=500&h=500&fit=crop'
            ],
            category: 'Fruits',
            sku: 'ORG-APP-001',
            weight: '2 kg',
            origin: 'Washington, USA',
            details: ['Organic certified', 'Crispy and sweet', 'Long shelf life', 'Pesticide free']
        },
        '4': {
            id: 4,
            name: 'Garden Soil',
            price: 28.99,
            originalPrice: 35.99,
            rating: 4.4,
            reviews: 89,
            inStock: true,
            description: 'Premium quality garden soil enriched with organic matter for healthy plant growth.',
            images: [
                'https://images.unsplash.com/photo-1592345954081-ff1bac2ce628?w=500&h=500&fit=crop'
            ],
            category: 'Gardening',
            sku: 'GAR-SOL-001',
            weight: '10 kg',
            origin: 'Local blend',
            details: ['Rich in organic matter', 'pH balanced', 'Good drainage', 'Suitable for all plants']
        }
    };

    const product = mockProducts[productId] || mockProducts['1'];
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = () => {
        // Dispatch add to cart action
        alert(`Added ${quantity} ${product.name}(s) to cart!`);
    };

    const handleAddToWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/checkout');
    };

    return (
        <UserLayout>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
                    >
                        <ArrowLeft size={20} />
                        Back to Products
                    </button>

                    {/* Product Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Images */}
                        <div>
                            {/* Main Image */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-96 object-cover"
                                />
                            </div>

                            {/* Thumbnail Images */}
                            {product.images.length > 1 && (
                                <div className="flex gap-3">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                                                selectedImage === idx ? 'border-green-600' : 'border-gray-200'
                                            }`}
                                        >
                                            <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Title & Rating */}
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-sm">
                                        {product.rating} ({product.reviews} reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-4xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                                    <span className="text-2xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">-{discount}%</span>
                                </div>
                                <p className="text-green-600 font-medium">Save ${(product.originalPrice - product.price).toFixed(2)}</p>
                            </div>

                            {/* Stock Status */}
                            <div>
                                {product.inStock ? (
                                    <p className="text-green-600 font-semibold text-lg">✓ In Stock</p>
                                ) : (
                                    <p className="text-red-600 font-semibold text-lg">Out of Stock</p>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

                            {/* Quantity & Actions */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="font-semibold text-gray-900">Quantity:</label>
                                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 text-gray-600 hover:text-gray-900"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-16 text-center border-0 focus:outline-none"
                                            min="1"
                                        />
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-3 py-2 text-gray-600 hover:text-gray-900"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart & Wishlist */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={!product.inStock}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ShoppingCart size={20} />
                                        <span>Add to Cart</span>
                                    </button>
                                    <button
                                        onClick={handleAddToWishlist}
                                        className={`px-6 py-3 border-2 rounded-lg transition font-medium ${
                                            isWishlisted
                                                ? 'bg-red-50 border-red-600 text-red-600'
                                                : 'border-gray-300 text-gray-700 hover:border-red-600'
                                        }`}
                                    >
                                        <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                                    </button>
                                </div>

                                {/* Buy Now */}
                                <button
                                    onClick={handleBuyNow}
                                    disabled={!product.inStock}
                                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <div className="text-center">
                                    <Truck className="mx-auto text-green-600 mb-2" size={24} />
                                    <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                                </div>
                                <div className="text-center">
                                    <RotateCcw className="mx-auto text-green-600 mb-2" size={24} />
                                    <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                                </div>
                                <div className="text-center">
                                    <Shield className="mx-auto text-green-600 mb-2" size={24} />
                                    <p className="text-sm font-medium text-gray-900">Secure</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Details Column */}
                        <div className="lg:col-span-2">
                            {/* Product Details */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Product Code</p>
                                        <p className="font-semibold text-gray-900">{product.sku}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Category</p>
                                        <p className="font-semibold text-gray-900">{product.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Weight</p>
                                        <p className="font-semibold text-gray-900">{product.weight}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Origin</p>
                                        <p className="font-semibold text-gray-900">{product.origin}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    {product.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-green-600 font-bold mt-1">✓</span>
                                            <span className="text-gray-700">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Customer Reviews */}
                            {mockProducts['1'].reviews && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                                    <div className="space-y-6">
                                        {mockProducts['1'].reviews.map((review) => (
                                            <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{review.author}</p>
                                                        <p className="text-gray-600 text-sm">{review.date}</p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={16}
                                                                className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                                                <p className="text-gray-700">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div>
                            {/* Quick Info */}
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-gray-600 mb-1">Price</p>
                                        <p className="font-semibold text-gray-900 text-lg">${product.price.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Availability</p>
                                        <p className="font-semibold text-green-600">In Stock</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Rating</p>
                                        <p className="font-semibold text-gray-900">{product.rating} ⭐ ({product.reviews} reviews)</p>
                                    </div>
                                    <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium text-sm">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
