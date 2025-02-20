import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const token = auth ? JSON.parse(auth).token : null;

    const getOrders = async () => {
      try {
        const response = await fetchOrders(token);
        if (response.success) {
          setOrders(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Order Placed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Total:</strong> ₹{order.total}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Items:</h3>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item._id} className="text-gray-600">
                      <strong>Product ID:</strong> {item.productId} | <strong>Quantity:</strong> {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;