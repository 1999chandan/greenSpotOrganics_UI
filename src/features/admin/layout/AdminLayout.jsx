import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Truck,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

/**
 * AdminNavbar - Top navigation bar for admin dashboard
 * Displays admin title and logout button
 */
const AdminNavbar = ({ onToggleSidebar, sidebarOpen }) => {
 const { user, isAuthenticated, loading, error, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">{user?.name || 'Admin'}</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

/**
 * AdminSidebar - Navigation sidebar for admin sections
 * Links to Dashboard, Products, Orders, and Logistics
 */
const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <BarChart3 size={20} />,
    },
    {
      path: '/admin/products',
      label: 'Products',
      icon: <Package size={20} />,
    },
    {
      path: '/admin/orders',
      label: 'Orders',
      icon: <ShoppingCart size={20} />,
    },
    {
      path: '/admin/logistics',
      label: 'Logistics',
      icon: <Truck size={20} />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 lg:transform-none z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold text-green-400">GreenSpot</h2>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-400">v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

/**
 * AdminLayout - Main layout wrapper for admin pages
 * Combines navbar and sidebar with main content area
 */
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export { AdminLayout, AdminNavbar, AdminSidebar };
export default AdminLayout;
