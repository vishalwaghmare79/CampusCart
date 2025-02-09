import React, { useState, useEffect } from "react";
import DynamicHelmet from "../components/Common/DynamicHelmet";
import axios from "axios";
import { useAuth } from "../context/auth";
import Spinner from "../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { useWishlist } from "../context/wishlist";

function HomePage() {
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([{ name: "All", _id: null }]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/get-category`;
      const { data } = await axios.get(API_BASE_URL);
      if (data?.success) {
        setCategories([{ name: "All", _id: null }, ...data.categories]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/get-products?page=${page}&limit=10`;
      const { data } = await axios.get(API_BASE_URL);
      if (data?.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (categoryId) => {
    setLoading(true);
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/get-products/${categoryId}?page=${page}&limit=10`;
      const { data } = await axios.get(API_BASE_URL);
      if (data?.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory && activeCategory._id) {
      getProductsByCategory(activeCategory._id);
    } else {
      getAllProducts();
    }
  }, [auth, activeCategory, page]);

  return (
    <>
      <DynamicHelmet
        title="Home Page - CampusCart"
        description="Welcome to CampusCart, the ultimate student marketplace for all your needs."
        keywords="home, ecommerce, marketplace, mern project, CampusCart"
      />
      <div className="home-container">
        <h2 className="home-title">Explore Categories</h2>
        <div className="home-nav-container">
          {categories.map((category) => (
            <div
              key={category._id || "all"}
              className={`category ${
                activeCategory.name === category.name ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.name}
            </div>
          ))}
        </div>

        <div className="products-section">
          <h6 className="home-title">{activeCategory.name}</h6>
          {loading ? (
            <Spinner />
          ) : products.length === 0 ? (
            <p className="no-products-message">No products available.</p>
          ) : (
            <div className="products-grid">
              {products.map((item) => (
                <div key={item._id} className="homepage-product-card">
                  <div
                    className="product-navigater"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <img
                      className="homepage-product-image"
                      src={item?.image?.url}
                      alt={item?.image?.publicId || "Product Image"}
                    />
                    <div className="homepage-product-details">
                      <h5 className="homepage-product-name">{item?.name}</h5>
                      <p className="homepage-product-description">
                        {item?.description?.length > 35
                          ? `${item.description.slice(0, 35)}...`
                          : item.description}
                      </p>
                      <p className="homepage-product-price">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="homepage-product-cardBtn">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        const itemExists = cart.some(
                          (cartItem) => cartItem._id === item._id
                        );
                        if (itemExists) {
                          toast.info(`${item.name} is already in your cart`);
                        } else {
                          const updatedCart = [...cart, item];
                          setCart(updatedCart);
                          localStorage.setItem("cart", JSON.stringify(updatedCart));
                          toast.success(`${item.name} added to cart`);
                        }
                      }}
                    >
                      Add To Cart
                    </button>
                    <button
                      className="wishlist-btn"
                      onClick={() => {
                        if (!auth?.user) {
                          navigate("/login", { state: "/" });
                        } else {
                          addToWishlist(item);
                        }
                      }}
                    >
                      <i className="ri-heart-line wishlist"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="prev-btn"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous Page
              </button>
              <button
                className="next-btn"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
