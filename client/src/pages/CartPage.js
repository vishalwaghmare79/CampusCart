import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import Spinner from "../components/spinner/Spinner";
import DynamicHelmet from "../components/Common/DynamicHelmet";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const removeCartItem = (id) => {
    let myCart = cart.filter((item) => item._id !== id);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    toast.success("Item removed from cart");
  };

  useEffect(() => {
    const result = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(result);
  }, [cart]);

  const getToken = async () => {
    const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/braintree/client_token`;
    const { data } = await axios.get(API_BASE_URL);
    setClientToken(data?.clientToken);
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/braintree/purchase`;
    await axios.post(API_BASE_URL, { cart, nonce, total });
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/orders");
    toast.success("Payment Successfully");
    setLoading(false);
  };

  return (
    <>
      <DynamicHelmet
        title="Shopping Cart - CampusCart"
        description="View and manage the items in your shopping cart on CampusCart."
        keywords="shopping cart, CampusCart, student marketplace"
      />
      <div className="cart-page">
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  className="cart-item-img"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p>{item.description ? item.description.slice(0, 30) : "No description available."}...</p>
                  <p>₹{item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => removeCartItem(item._id)}>Remove</button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <h4>Current Address: {auth?.user?.address || "No address available"}</h4>
            <div className="total-price">Total: ₹{total}</div>
            {clientToken && (
              <DropIn options={{ authorization: clientToken }} onInstance={setInstance} />
            )}
            {loading ? (
              <Spinner />
            ) : (
              <button className="checkout-btn" onClick={handlePayment}>
                Make Payment
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
