import React from 'react'
import ProductCard from './ProductCard';

function ProductGrid() {
  return (
    <div>
        
        {/* Products Grid */}
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h3 className="text-3xl font-bold mb-8">Featured Products</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4, 5].map((item) => (
      <ProductCard productInfo={item} />
    ))}
    </div>
  </section>
    </div>
  )
}

export default ProductGrid