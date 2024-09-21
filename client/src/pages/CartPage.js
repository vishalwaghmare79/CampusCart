import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import Spinner from "../components/spinner/Spinner";

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const result = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(result);
  }, [cart]);

  // get payment gateway token
  const getToken = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/braintree/client_token`;
      const { data } = await axios.get(API_BASE_URL);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error("Error fetching Braintree token:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/braintree/purchase`;
      const { data } = await axios.post(API_BASE_URL, {
        cart,
        nonce,
        total,
      });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  return (
    <div className="cart-container">
      <div className="cart-items-section">
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item) => (
            <div key={item._id} className="homepage-product-card">
              <div
                className="product-navigater"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                }}
              >
                <img
                  className="homepage-product-image"
                  src={`${imageBaseURL}/${item._id}`}
                  alt={item?.name || "Product Image"}
                />
                <div className="homepage-product-details">
                  <h5 className="homepage-product-name">{item.name}</h5>
                  <p className="homepage-product-description">
                    {item.description.substring(0, 20)}
                  </p>
                  <p className="homepage-product-price">₹{item.price}</p>
                </div>
              </div>
              <div className="homepage-product-cardBtn">
                <button
                  className="cart-item-remove-btn"
                  onClick={() => removeCartItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">Your cart is empty.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary-section">
          <h1>Cart Summary</h1>
          <h4>Current Address</h4>
          <div>Address: {auth?.user?.address || "No address available"}</div>
          <div className="cart-total-section">
            <p className="cart-total-price">Total: ${total}</p>
            {auth?.user ? (
              <>
                {clientToken && (
                  <DropIn
                    options={{ authorization: clientToken }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                )}
                {loading ? (
                  <Spinner />
                ) : (
                  <button className="checkout-btn" onClick={handlePayment}>
                    Make Payment
                  </button>
                )}
              </>
            ) : (
              <button
                className="checkout-btn"
                onClick={() => navigate("/login", { state: { from: "/cart" } })}
              >
                Please Login to Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
