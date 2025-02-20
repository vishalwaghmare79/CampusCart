import React from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { Link } from "react-router-dom";

const WishlistCard = ({ product }) => {
  const isShippingAvailable = product.productId.shipping;
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (!isShippingAvailable) {
      toast.error("Shipping is not available for this product.");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative">
      <img
        src={product.productId.image?.url || "https://via.placeholder.com/150"} 
        alt={product.productId.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.productId.name}</h3>
        <button
          onClick={() => removeFromWishlist(product)} 
          aria-label="Remove from wishlist"
          className="p-2 transition-colors duration-300 text-red-500 hover:text-red-700"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-600">{product.productId.price} ₹</p>
      <p className="text-sm text-gray-500">{product?.productId.category?.name}</p>

      <p className="text-sm mt-2">
        {isShippingAvailable ? (
          <span className="text-green-500">Shipping Available</span>
        ) : (
          <span className="text-red-500">No Shipping</span>
        )}
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/products/productdetailspage/${product.productId._id}`}
          className="w-1/2 py-2 px-4 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 transition"
        >
          View Details
        </Link>
        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className={`w-1/2 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors duration-300 ${
            isShippingAvailable
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isShippingAvailable}
        >
          <FaShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;