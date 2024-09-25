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
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [activeCategory, setActiveCategory] = useState({
    name: "All",
    id: null,
  });

  // Get all categories
  const getAllCategory = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/get-category`;
      const { data } = await axios.get(API_BASE_URL);
      if (data?.success) {
        setCategories([{ name: "All", _id: null }, ...data.categories]);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Fetch Products
const getAllProducts = async () => {
  setLoading(true);
  try {
    const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/get-products?page=${page}&limit=10&category=${activeCategory?.id || ""}`;
    const { data } = await axios.get(API_BASE_URL);
    setProducts(data.products);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchData = async () => {
    // Fetch only when auth token is available or user is not logged in
    if (auth && auth.token) {
      await getAllProducts();
    } else {
      await getAllProducts();
    }
  };

  fetchData();
  // eslint-disable-next-line
}, [auth, activeCategory, page]);

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

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
              key={category.name}
              className={`category ${
                activeCategory.name === category.name ? "active" : ""
              }`}
              onClick={() =>
                setActiveCategory({
                  name: category.name,
                  id: category._id,
                })
              }
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
                      <h5 className="homepage-product-name">{item?.name}</h5>
                      <p className="homepage-product-description">
                        <p>
                          {item?.description?.length > 35
                            ? `${item.description.slice(0, 35)}...`
                            : item.description}
                        </p>
                      </p>
                      <p className="homepage-product-price">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="homepage-product-cardBtn">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        const itemExists = cart.some(cartItem => cartItem._id === item._id);
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
                      onClick={() => {
                        if (!auth?.user) {
                          navigate("/login", { state: "/" });
                        } else {
                          addToWishlist(item);
                        }
                      }}
                      className="wishlist-btn"
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
                onClick={() => {
                  if (page > 1) {
                    setPage((prev) => prev - 1);
                  }
                }}
                disabled={page === 1}
              >
                Previous Page
              </button>
              <button
                className="next-btn"
                onClick={() => {
                  if (page < totalPages) {
                    setPage((prev) => prev + 1);
                  }
                }}
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
