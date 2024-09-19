import React, { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from 'moment';
import { Select } from 'antd';
import { toast } from "react-toastify";

function ManageOrder() {
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); 
  const { Option } = Select; 
  
  // Fetch all orders
  const getOrders = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/auth/all-orders`;
      const { data } = await axios.get(API_BASE_URL);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  // Handle status change
  const handleChangeStatus = async (orderId, value) => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`;
      const { data } = await axios.put(API_BASE_URL, { status: value });
      getOrders();
      toast.success(data.message); 
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status"); 
    }
  };

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  return (
    <div className="dashboard">
      <div className="sidebar">
        <AdminMenu />
      </div>
      <div className="content">
        <h1>Manage All Orders</h1>
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Buyer</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Payment</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>
                  {order.products.map((item, j) => (
                    <div key={j} className="product-info">
                      <img
                        className="product-image-small"
                        src={`${imageBaseURL}/${item._id}`}
                        alt={item?.name || 'Product Image'}
                      />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </td>
                <td>{order.buyer.name}</td>
                <td>
                  <Select
                    bordered={false}
                    onChange={(value) => handleChangeStatus(order._id, value)}
                    defaultValue={order.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>{s}</Option> 
                    ))}
                  </Select>
                </td>
                <td>{moment(order.createdAt).fromNow()}</td>
                <td>{order.payment?.success ? 'Success' : 'Failed'}</td>
                <td>{order.products.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOrder;
