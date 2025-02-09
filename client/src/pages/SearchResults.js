import React, { useState, useEffect } from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { toast } from "react-toastify";
import SearchInput from './../components/Form/SearchInput';

function SearchResults() {
  const [values, setValues] = useSearch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  useEffect(() => {
    setLoading(false);
    setTotalPages(2);
  }, [values.keyword, page]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="home-container">
        <SearchInput />
        <h2 className="home-title">Search Results for "{values.keyword}"</h2>

        <div className="products-section">
          

          {loading ? (
            <Spinner />
          ) : values.results.length === 0 ? (
            <p className="no-products-message">No products found</p>
          ) : (
            <div className="products-grid">
              {values.results.map((product) => (
                <div key={product._id} className="homepage-product-card">
                  <div
                    className="product-navigater"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      className="homepage-product-image"
                      src={`${imageBaseURL}/${product._id}`}
                      alt={product?.name || "Product Image"}
                    />
                    <div className="homepage-product-details">
                      <h5 className="homepage-product-name">{product.name}</h5>
                      <p className="homepage-product-description">
                        {product.description.length > 35
                          ? `${product.description.slice(0, 35)}...`
                          : product.description}
                      </p>
                      <p className="homepage-product-price">₹{product.price}</p>
                    </div>
                  </div>
                  <div className="homepage-product-cardBtn">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        // Add product to cart logic
                        toast.success(`${product.name} added to cart`);
                      }}
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => {
                        // Handle wishlist logic
                        toast.info(`${product.name} added to wishlist`);
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
                  if (page > 1) setPage(page - 1);
                }}
                disabled={page === 1}
              >
                Previous Page
              </button>
              <button
                className="next-btn"
                onClick={() => {
                  if (page < totalPages) setPage(page + 1);
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

export default SearchResults;
