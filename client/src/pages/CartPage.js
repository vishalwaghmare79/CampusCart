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
  }, [auth?.user]);

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
                  src={`${imageBaseURL}/${item._id}`}
                  alt={item?.name || "Product Image"}
                />
                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p className="cart-item-description">{item.description ? item.description.slice(0, 30) : "No description available."}...</p>
                  <p>₹{item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => removeCartItem(item._id)}>Remove</button>
              </div>
            ))
          ) : (
            <p className="no-products-message">Your cart is empty.</p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <h4>Current Address: {auth?.user?.address || "No address available"}</h4>
            <div className="total-price">Total: ₹{total}</div>
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
                onClick={() => navigate("/login", { state: "/cart" })}
              >
                Please Login to Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
