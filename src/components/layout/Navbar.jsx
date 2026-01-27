import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-600">GreenSpot</Link>
          <div className="flex gap-6">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-600 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-green-600">
                Login
              </Link>
            )}
            <Link to="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-green-600">
              Cart
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
