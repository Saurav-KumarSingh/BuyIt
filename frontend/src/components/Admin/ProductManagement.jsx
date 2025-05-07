import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice';

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(productId));
        }
    };

    if (loading) return <div className="text-center text-gray-500 py-10">Loading products...</div>;
    if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Product Management</h2>
                <Link
                    to="/admin/products/create"
                    className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                    + Add Product
                </Link>
            </div>

            {/* Table View - only for extra large screens */}
            <div className="hidden xl:block overflow-x-auto shadow ring-1 ring-gray-200 rounded-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">SKU</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.length > 0 ? products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-800 font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-gray-700">₹{product.price}</td>
                                <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                                <td className="px-6 py-4 space-x-2">
                                    <Link
                                        to={`/admin/products/${product._id}/edit`}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card Grid View - for all screens below xl */}
            <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.length > 0 ? products.map(product => (
                    <div
                        key={product._id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between border border-gray-100 transition hover:shadow-lg"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">Price: ₹{product.price}</p>
                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Link
                                to={`/admin/products/${product._id}/edit`}
                                className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2 rounded-md"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 col-span-full">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;
