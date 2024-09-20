import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.productId) 
      getProduct();
  }, [params?.productId]);

  const getProduct = async () => {
    setLoading(true);
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.productId}`;
      const { data } = await axios.get(API_BASE_URL);
      setProduct(data?.product);
      setProductId(data?.product?._id)
    } catch (error) {
      console.log(error);
    } finally {
        setLoading(false);
    }
  };

  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  return (
    <div className="product-details-page">
      {loading? (<Spinner />) : (<div className="product-details-container">
        <div className="product-img-section">
          <img
            className="product-img"
            src={`${imageBaseURL}/${productId}`}
            alt={product?.name || "Product Image"}
          />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product?.name}</h1>
          <p className="product-price-info">Price: ₹{product?.price}</p>
          <p className="product-desc">{product?.description}</p>
          <div className="product-meta">
            <p className="product-cat">
              <span>Category:</span> {product?.category?.name}
            </p>
            <p className="product-qty">
              <span>Quantity:</span> {product?.quantity}
            </p>
            <p
              className={`product-ship-status ${
                product?.shipping ? "product-available" : "product-sold-out"
              }`}
            >
              {product?.shipping ? "Available" : "Sold Out"}
            </p>
          </div>
          <button className="add-to-cart-btn btn-width">Add To Cart</button>
        </div>
      </div>)}
    </div>
  );
}

export default ProductDetails;
