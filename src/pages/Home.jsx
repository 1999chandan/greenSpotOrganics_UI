import React from 'react';
import UserLayout from '../components/layout/UserLayout';
import HeroSection from '../components/layout/HeroSection';
import ProductCatalog from '../features/products/ProductFilter';
import { Link } from 'react-router-dom';
import { Leaf, Truck, Shield, Award } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <Leaf size={32} />,
      title: '100% Organic',
      description: 'All products are certified organic and pesticide-free',
    },
    {
      icon: <Truck size={32} />,
      title: 'Fast Delivery',
      description: 'Fresh produce delivered to your doorstep within 24 hours',
    },
    {
      icon: <Shield size={32} />,
      title: 'Quality Guaranteed',
      description: 'Handpicked products from trusted local farmers',
    },
    {
      icon: <Award size={32} />,
      title: 'Best Prices',
      description: 'Direct from farm pricing with no middlemen markup',
    },
  ];

  return (
    <UserLayout>
      {/* Hero Section */}
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <HeroSection />
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose GreenSpot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-4 text-green-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Our Fresh Produce
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Browse our wide selection of organic products sourced directly from local farms
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Products</h2>
          <ProductCatalog />
        </div>
      </section>
    </UserLayout>
  );
}

export default Home;