import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';

function WishlistPage() {
  const { items } = useSelector((state) => state.wishlist);

  if (items.length === 0) {
    return (
      <UserLayout>
        <div className="pt-24 pb-12 bg-gray-50 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full text-center">
            <Heart size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Add products to your wishlist to save them for later
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-green-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default WishlistPage;
