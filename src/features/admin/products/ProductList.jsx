import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  setCurrentPage,
} from './productAdminSlice';
import productAdminAPI from './productAdminAPI';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

/**
 * ProductList - Displays all products in a data table with CRUD actions
 */
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, currentPage, pageSize, totalCount } = useSelector(
    (state) => state.productAdmin
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    dispatch(fetchProductsStart());
    try {
      const data = await productAdminAPI.fetchProducts(currentPage, pageSize);
      dispatch(fetchProductsSuccess(data));
    } catch (err) {
      dispatch(fetchProductsFailure(err.message));
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    dispatch(deleteProductStart());
    try {
      await productAdminAPI.deleteProduct(productId);
      dispatch(deleteProductSuccess(productId));
    } catch (err) {
      dispatch(deleteProductFailure(err.message));
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <button
          onClick={() => navigate('/admin/products/new')}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-6 text-center text-gray-500">
          Loading products...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {/* Table */}
      {!loading && filteredProducts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  SKU
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.sku}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 20
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        product.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="p-12 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalCount > pageSize && (
        <div className="p-6 border-t border-gray-200 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(totalCount / pageSize) }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => dispatch(setCurrentPage(i + 1))}
              className={`px-4 py-2 rounded transition ${
                currentPage === i + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

// Icon placeholder for products without lucide-react
import { Package } from 'lucide-react';
