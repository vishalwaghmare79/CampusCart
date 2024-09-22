import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from 'moment';
import DynamicHelmet from "../../components/Common/DynamicHelmet";
import Spinner from "../../components/spinner/Spinner";


function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth(); 

  const getOrders = async () => {
    try {
      setLoading(true)
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/auth/orders`;
      const { data } = await axios.get(API_BASE_URL);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  return (
   <>
     <DynamicHelmet
      title="Track Orders - CampusCart"
      description="Monitor and track your orders on CampusCart. Stay updated on the status of your purchases and sales."
      keywords="track orders, order status, CampusCart, student marketplace, order management"
    />
    <div className="dashboard">
      <div className="sidebar">
        <UserMenu />
      </div>
      <div className="content">
      <h1>All Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Payment</th>
            <th>Quantity</th>
          </tr>
        </thead>
        {loading ? <Spinner /> : (<tbody>
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
              <td>{order.status}</td>
              <td>{moment(order.createdAt).fromNow()}</td>
              <td>{order.payment?.success ? 'Success' : 'Failed'}</td>
              <td>{order.products.length}</td>
            </tr>
          ))}
        </tbody>)}
      </table>
    </div>

    </div>
   </>
  );
}

export default Orders;
