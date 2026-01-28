import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
} from './dashboardSlice';
import dashboardAPI from './dashboardAPI';
import { BarChart3, Package, ShoppingCart, TrendingUp, Users, AlertCircle } from 'lucide-react';

/**
 * StatsCard - Displays a single statistic with icon and trend
 */
const StatsCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
      <div className={`p-4 rounded-lg ${color}`}>
        <Icon size={28} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-xs font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Dashboard - Admin analytics and overview dashboard
 * Displays key metrics, recent orders, and quick stats
 */
const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, recentOrders, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    dispatch(fetchStatsStart());
    try {
      const data = await dashboardAPI.fetchStats();
      dispatch(fetchStatsSuccess(data));
    } catch (err) {
      dispatch(fetchStatsFailure(err.message));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <BarChart3 size={48} className="text-green-600" />
          </div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your business overview.</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Error loading dashboard</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="bg-blue-600"
          trend={8}
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          color="bg-purple-600"
          trend={12}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${(stats.totalRevenue || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          icon={TrendingUp}
          color="bg-green-600"
          trend={15}
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          icon={Users}
          color="bg-orange-600"
          trend={5}
        />
      </div>

      {/* Alert for Pending Orders */}
      {stats.pendingOrders > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900">Pending Orders</p>
            <p className="text-yellow-700 text-sm">
              You have {stats.pendingOrders} order(s) waiting for processing.
            </p>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
        </div>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{order.customerName}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'shipped'
                            ? 'bg-purple-100 text-purple-800'
                            : order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No recent orders
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition cursor-pointer">
          <Package size={32} className="mx-auto text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-800">Add Product</h3>
          <p className="text-sm text-gray-500 mt-1">Create new product</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition cursor-pointer">
          <ShoppingCart size={32} className="mx-auto text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-800">View Orders</h3>
          <p className="text-sm text-gray-500 mt-1">Manage all orders</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition cursor-pointer">
          <TrendingUp size={32} className="mx-auto text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-800">View Reports</h3>
          <p className="text-sm text-gray-500 mt-1">Sales analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
