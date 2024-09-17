import React from 'react';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CartPage() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  return (
    <div className="cart-container">
      <div className="cart-items-section">
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                className="homepage-product-image"
                src={`${imageBaseURL}/${item._id}`}
                alt={item?.name || 'Product Image'}
              />
              <div className="cart-item-details">
                <h5 className="cart-item-name">{item.name}</h5>
                <p className="cart-item-description">
                  {item.description.substring(0, 20)}
                </p>
                <p className="cart-item-price">${item.price}</p>
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
          <p>Your cart is empty.</p>
        )}
      </div>
  
      {cart.length > 0 && (
        <div className="cart-summary-section">
          <h1>Cart Summary</h1>
          <h4>Current Address</h4>
          <div>Address: {auth?.user?.address}</div>
          <div className="cart-total-section">
            <p className="cart-total-price">Total: ${calculateTotal()}</p>
            {auth?.user ? (
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                Checkout
              </button>
            ) : (
              <button className='checkout-btn'
                onClick={() => {
                  navigate("/login", { state: '/cart' });
                }}
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
