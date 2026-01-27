import React from 'react'

function HeroSection() {
  return (
    <div>
        {/* Hero Section */}
  <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold mb-4">Organic Products</h2>
    <p className="text-lg mb-8">Sustainably grown, naturally pure</p>
    <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">Shop Now</button>
    </div>
  </section>
    </div>
  )
}

export default HeroSection