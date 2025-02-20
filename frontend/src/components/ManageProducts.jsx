import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteProduct, getUserProducts } from "../services/productService";
import useAuth from "../hooks/useAuth";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { auth } = useAuth();
  const { token } = auth;

  // Fetch user products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getUserProducts(token);
        if (res.success) {
          setProducts(res.products);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, [token]);

  // Handle delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(id);
        if (res.success) {
          toast.success(res.message);
          setProducts(products.filter((product) => product._id !== id));
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipping
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.image.url}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <span className="ml-4 text-sm font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.price} ₹
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.shipping ? (
                      <span className="text-green-500">Available</span>
                    ) : (
                      <span className="text-red-500">Not Available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link
                      to={`/${auth?.user?.role === 1 ? `admin/dashboard/update-product/${product._id}` : `user/dashboard/update-product/${product._id}`}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      >
                        
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;