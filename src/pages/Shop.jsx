import React from 'react';

const Shop = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Shop</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 shadow-lg">
                    <img src="path/to/image1.jpg" alt="Product 1" className="w-full h-48 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-semibold mt-2">Product 1</h2>
                    <p className="text-gray-600">$19.99</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Add to Cart</button>
                </div>
                <div className="border rounded-lg p-4 shadow-lg">
                    <img src="path/to/image2.jpg" alt="Product 2" className="w-full h-48 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-semibold mt-2">Product 2</h2>
                    <p className="text-gray-600">$29.99</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Add to Cart</button>
                </div>
                <div className="border rounded-lg p-4 shadow-lg">
                    <img src="path/to/image3.jpg" alt="Product 3" className="w-full h-48 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-semibold mt-2">Product 3</h2>
                    <p className="text-gray-600">$39.99</p>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Shop;