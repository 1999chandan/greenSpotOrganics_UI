import React from 'react'

function Navbar() {
  return (
    <div>
{/* Header */}
  <header className="bg-white shadow">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-green-600">GreenSpot</h1>
    <div className="flex gap-6">
      <a href="/login" className="text-gray-700 hover:text-green-600">login</a>
      <a href="/about" className="text-gray-700 hover:text-green-600">About</a>
      <a href="/cart" className="text-gray-700 hover:text-green-600">Cart</a>
    </div>
    </nav>
  </header>

    </div>
  )
}

export default Navbar