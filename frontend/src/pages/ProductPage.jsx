import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllCategories } from "../services/categoryService";
import {
  getAllProducts,
  getProductsByCategory,
} from "../services/productService";
import ProductCard from "../components/ProductCard";
import useAuth from "./../hooks/useAuth";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const { auth } = useAuth();
  const { token } = auth;
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("category");
    if (categoryId) {
      setSelectedCategory(categoryId);
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts();
    }
  }, [location.search]);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.categories);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts(token);
      if (res.success) {
        setProducts(res.products);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await getProductsByCategory(categoryId, token);
      if (res.success) {
        setProducts(res.products);
      }
    } catch (error) {
      console.error("Error loading products by category:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    if (category === selectedCategory) {
      fetchProducts();
    } else {
      fetchProductsByCategory(category);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category?._id === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/4 md:p-6 p-1.5 bg-white shadow-sm">
        <h2 className="md:text-xl font-bold mb-6 text-gray-800">
          Filter by Category
        </h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`block w-full py-2 md:px-4 text-xs md:text-base text-center md:text-left rounded-lg transition-colors duration-300 ${
                selectedCategory === category._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 p-2 md:p-6">
        <div className="flex space-x-2 mb-8">
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Search
          </button>
        </div>

        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  shipping={product.shipping}
                  image={product.image}
                  _id={product._id}
                  price={product.price}
                  category={product.category}
                  onAddToWishlist={() => addToWishlist(product)} 
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
