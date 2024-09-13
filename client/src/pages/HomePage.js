import React, { useState, useEffect } from "react";
import DynamicHelmet from "../components/Common/DynamicHelmet";
import axios from "axios";
import { useAuth } from "../context/auth";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/get-category`;
      const { data } = await axios.get(API_BASE_URL);
      if (data?.success) {
        setCategories([{ name: "All" }, ...data.categories]);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  // Get all products
  const getAllProducts = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/get-products`;
      const { data } = await axios.get(API_BASE_URL);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products based on activeCategory
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category && product.category.name === activeCategory
        );

  return (
    <>
      <DynamicHelmet
        title="Home Page - Shopease E-Commerce"
        description="Welcome to Shopease, the ultimate student marketplace for all your needs."
        keywords="home, ecommerce, marketplace, mern project, Shopease"
      />
      <div className="home-container">
        <h2 className="home-category-title">Explore Categories</h2>
        <div className="home-nav-container">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`category ${
                activeCategory === category.name ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>

        <div className="products-section">
          <h6 className="products-title">{activeCategory}</h6>
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(
                (item) =>
                  auth?.user?.id !== item.createdBy && (
                    <div key={item._id} className="homepage-product-card">
                      <img
                        className="homepage-product-image"
                        src={`${imageBaseURL}/${item._id}`}
                        alt={item?.name || "Product Image"}
                      />
                      <div className="homepage-product-details">
                        <h5 className="homepage-product-name">{item?.name}</h5>
                        <p className="homepage-product-description">
                          {item?.description}
                        </p>
                        <button className="add-to-cart-btn">Add To Cart</button>
                      </div>
                    </div>
                  )
              )
            ) : (
              <p className="no-products">No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
