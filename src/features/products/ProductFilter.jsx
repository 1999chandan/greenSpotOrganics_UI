import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategories,
  setPriceRange,
  setAvailability,
  setSearch,
  setCurrentPage,
} from '../../features/products/productSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';
import { Heart, ShoppingCart, Star } from 'lucide-react';

/**
 * ProductFilter - Sidebar filter component
 * Categories, price range, and availability filters
 */
const ProductFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const categories = [
    'All',
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Beverages',
  ];

  const handleCategoryChange = (category) => {
    const updatedCategories =
      category === 'All'
        ? []
        : filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category];

    dispatch(setCategories(updatedCategories));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={
                  category === 'All'
                    ? filters.categories.length === 0
                    : filters.categories.includes(category)
                }
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              dispatch(setPriceRange([filters.priceRange[0], parseInt(e.target.value)]))
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Availability</h4>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Products' },
            { value: 'inStock', label: 'In Stock' },
            { value: 'outOfStock', label: 'Out of Stock' },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value={option.value}
                checked={filters.availability === option.value}
                onChange={(e) => dispatch(setAvailability(e.target.value))}
                className="w-4 h-4 text-green-600"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * ProductCard - Individual product card with image, price, rating, and actions
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      {/* Image Container */}
      <div className="relative bg-gray-200 h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition"
        />
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < Math.floor(product.rating || 4)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews || 0})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 transition text-sm font-medium"
          >
            <ShoppingCart size={16} />
            Add
          </button>
          <button className="flex-1 px-3 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition text-sm font-medium">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * ProductCatalog - Main product listing with filters and grid
 */
const ProductCatalog = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
    filters,
    pagination,
  } = useSelector((state) => state.products);

  // Mock data - replace with API call
  const mockProducts = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 5.99,
      originalPrice: 7.99,
      image: 'https://images.unsplash.com/photo-1592924357615-d20e55a98860?w=300&h=300&fit=crop',
      rating: 5,
      reviews: 128,
      stock: 50,
      category: 'Vegetables',
      discount: 25,
    },
    {
      id: '2',
      name: 'Fresh Strawberries',
      price: 8.49,
      image: 'https://images.unsplash.com/photo-1587393853556-4985bb60b4bc?w=300&h=300&fit=crop',
      rating: 4,
      reviews: 95,
      stock: 30,
      category: 'Fruits',
      discount: 0,
    },
    {
      id: '3',
      name: 'Organic Spinach',
      price: 3.99,
      originalPrice: 5.49,
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=300&fit=crop',
      rating: 4,
      reviews: 65,
      stock: 45,
      category: 'Vegetables',
      discount: 27,
    },
    {
      id: '4',
      name: 'Golden Apples',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1560806e614632-5db3fe3b8e1f?w=300&h=300&fit=crop',
      rating: 5,
      reviews: 142,
      stock: 60,
      category: 'Fruits',
      discount: 0,
    },
    {
      id: '5',
      name: 'Whole Wheat Bread',
      price: 4.49,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
      rating: 4,
      reviews: 78,
      stock: 40,
      category: 'Grains',
      discount: 0,
    },
    {
      id: '6',
      name: 'Organic Milk',
      price: 5.49,
      originalPrice: 6.99,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
      rating: 5,
      reviews: 110,
      stock: 35,
      category: 'Dairy',
      discount: 21,
    },
  ];

  // Filter products
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesPrice =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesAvailability =
      filters.availability === 'all' ||
      (filters.availability === 'inStock' && product.stock > 0) ||
      (filters.availability === 'outOfStock' && product.stock === 0);

    return matchesCategory && matchesPrice && matchesAvailability;
  });

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-2">
            Discover our wide range of fresh, organic products
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <ProductFilter />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Results Info */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No products found matching your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
