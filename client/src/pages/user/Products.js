import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import DynamicHelmet from "../../components/Common/DynamicHelmet";

function Products() {
  const [products, setProducts] = useState([]);
  const imageBaseURL = `${process.env.REACT_APP_API}/api/v1/product/product-image`;

  // Get all products
  const getAllProducts = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/user-products`;
      const { data } = await axios.get(API_BASE_URL);
      setProducts(data?.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`;
      await axios.delete(API_BASE_URL);
      toast.success("Product deleted successfully");
      getAllProducts(); // Refresh the product list
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the product");
    }
  };

  return (
    <>
     <DynamicHelmet
      title="Manage Products - CampusCart"
      description="Efficiently manage your products on CampusCart. Edit, update, or remove listings to keep your inventory current."
      keywords="manage products, product listings, CampusCart, student marketplace, inventory management"
    />
    <div className="dashboard">
      <div className="sidebar">
        <UserMenu />
      </div>
      <div className="content">
        <h1 className="content-title">All Products</h1>
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className="product-card">
              <img
                className="product-image"
                src={`${imageBaseURL}/${item._id}`}
                alt={item?.name || "Product Image"}
              />
              <div className="product-details">
                <h5 className="product-name">{item?.name}</h5>
                <p className="product-description">{item?.description}</p>
              </div>
              <div className="product-actions">
                <Link to={`/dashboard/user/products/${item._id}`} className="update-link">
                  <button className="update-button">Update</button>
                </Link>
                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Products;
