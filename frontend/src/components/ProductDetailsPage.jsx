import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify"; 
import { useParams } from "react-router-dom"; 
import useCart from "../hooks/useCart";
import { getProductById } from "../services/productService";

const ProductDetailsPage = () => {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found!</div>;

  const handleAddToCart = () => {
    if (!product.shipping) {
      toast.error("Shipping is not available for this product.");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          src={product.image?.url}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <button className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300">
            <FaHeart className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          {product.price} ₹
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Category: {product?.category?.name}
        </p>

        <p className="text-sm mb-6">
          {product.shipping ? (
            <span className="text-green-500">Shipping Available</span>
          ) : (
            <span className="text-red-500">No Shipping</span>
          )}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-colors duration-300 ${
              product.shipping
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!product.shipping}
          >
            <FaShoppingCart className="w-6 h-6" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
