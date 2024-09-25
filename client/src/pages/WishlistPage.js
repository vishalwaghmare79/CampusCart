import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { useWishlist } from "../context/wishlist";
import DynamicHelmet from "../components/Common/DynamicHelmet";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  return (
    <>
      <DynamicHelmet
        title="Wishlist - CampusCart"
        description="View and manage your wishlist on CampusCart. Save your favorite products for future purchases."
        keywords="wishlist, saved items, CampusCart, student marketplace, favorite products"
      />
      <div className="home-container">
        <div className="products-section">
          {wishlist && wishlist.length > 0 ? (
            <div className="products-grid">
              {wishlist.map((item) => (
                <div key={item._id} className="homepage-product-card">
                  <div
                    className="product-navigater"
                    onClick={() => navigate(`/product/${item?.productId?._id}`)}
                  >
                    <img
                      className="homepage-product-image"
                      src={`${imageBaseURL}/${item?.productId?._id}`}
                      alt={item?.productId?.name || "Product Image"}
                    />
                    <div className="homepage-product-details">
                      <h5 className="homepage-product-name">
                        {item?.productId?.name}
                      </h5>
                      <p className="homepage-product-description">
                        {item?.productId?.description}
                      </p>
                      <p className="homepage-product-price">
                        ₹{item?.productId?.price}
                      </p>
                    </div>
                  </div>
                  <div className="homepage-product-cardBtn">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        const itemExists = cart.some(cartItem => cartItem._id === item?.productId?._id);
                        if (itemExists) {
                          toast.info(`${item?.productId?.name} is already in your cart`);
                        } else {
                          const updatedCart = [...cart, item.productId];
                          setCart(updatedCart);
                          removeFromWishlist(item)
                          localStorage.setItem("cart", JSON.stringify(updatedCart));
                          toast.success(`${item?.productId?.name} added to cart`);
                        }
                      }}
                    >
                      Add To Cart
                    </button>
                    <button
                      className="delete-icon"
                      onClick={() => removeFromWishlist(item)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-products-message">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
