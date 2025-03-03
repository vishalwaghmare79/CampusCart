import React from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const ProductCard = ({
  name,
  shipping,
  image,
  _id,
  price,
  category,
  isWishlist = false, 
  onAddToWishlist, 
  onRemove, 
}) => {
  const isShippingAvailable = shipping;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!isShippingAvailable) {
      toast.error("Shipping is not available for this product.");
      return;
    }
    addToCart({ _id, name, price, image, category, shipping }); 
    toast.success(`${name} added to cart!`);
  };

  const handleWishlistClick = () => {
    if (isWishlist) {
      onRemove();
    } else {
      onAddToWishlist();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative">
      <img
        src={image?.url}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <button
          onClick={handleWishlistClick} 
          className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
        >
          {isWishlist ? (
            <FaTrash className="w-5 h-5" /> 
          ) : (
            <FaHeart className="w-5 h-5" /> 
          )}
        </button>
      </div>

      <p className="text-gray-600">{price} ₹</p>
      <p className="text-sm text-gray-500">{category?.name}</p>

      <p className="text-sm mt-2">
        {isShippingAvailable ? (
          <span className="text-green-500">Shipping Available</span>
        ) : (
          <span className="text-red-500">No Shipping</span>
        )}
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/products/productdetailspage/${_id}`}
          className="w-1/2 py-2 px-4 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 transition"
        >
          View Details
        </Link>
        <button
          onClick={handleAddToCart}
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

export default ProductCard;
