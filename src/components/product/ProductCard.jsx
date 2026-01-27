import React from 'react'

function ProductCard(props) {
    const { productInfo } = props;
  return (
    <>
    <div key={productInfo} className="bg-white rounded-lg shadow hover:shadow-lg transition">
        <div className="bg-gray-200 h-48 rounded-t-lg"></div>
        <div className="p-4">
        <h4 className="font-semibold mb-2">Product {productInfo}</h4>
        <p className="text-gray-600 text-sm mb-4">Organic product description</p>
        <button className="w-full mb-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">Add to Cart</button>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Buy</button>

        </div>
      </div>
      </>
  )
}

export default ProductCard