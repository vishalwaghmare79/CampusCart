import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import DynamicHelmet from "../../components/Common/DynamicHelmet";
const { Option } = Select;

function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [shipping, setShipping] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/get-category`;
      const res = await axios.get(API_BASE_URL);
      if (res.data?.success) {
        setCategories(res.data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSell = async (e) => {
    e.preventDefault();

    // Validation before sending the request
    if (!name) {
      return toast.error("Name is required");
    }
    if (!price) {
      return toast.error("Price is required");
    }
    if (!description) {
      return toast.error("Description is required");
    }
    if (!category) {
      return toast.error("Category is required");
    }
    if (!quantity) {
      return toast.error("Quantity is required");
    }
    if (!image || image.size > 1048576) {
      return toast.error("Image is required and should be less than 1MB");
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("image", image);

      setLoading(true);
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/product/create-product`;
      const { data } = await axios.post(API_BASE_URL, productData);

      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/user/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <DynamicHelmet
      title="Sell Products - CampusCart"
      description="List your products for sale on CampusCart and connect with students looking to buy within the campus community."
      keywords="sell products, list items, student marketplace, CampusCart, buy and sell, student community"
    />
    <div className="dashboard">
      <div className="sidebar">
        <UserMenu />
      </div>
      <div className="content">
        <h1 className="content-title">Sell Product</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="form-section">
              <Select
                className="custom-select"
                placeholder="Select a category"
                size="large"
                showSearch
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="form-section">
              <label className="file-upload-label">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  id="upload-image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            {image && (
              <div className="form-section image-preview">
                <img
                  src={URL.createObjectURL(image)}
                  alt="product_image"
                />
              </div>
            )}
            <div className="form-section">
              <input
                type="text"
                className="custom-form-input"
                value={name}
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-section">
              <textarea
                className="custom-form-textarea"
                value={description}
                placeholder="Enter product description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-section">
              <input
                type="number"
                className="custom-form-input"
                value={price}
                placeholder="Enter product price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-section">
              <input
                type="number"
                className="custom-form-input"
                value={quantity}
                placeholder="Enter product quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-section">
              <Select
                className="custom-select"
                placeholder="Select shipping option"
                size="large"
                onChange={(value) => setShipping(value)}
              >
                <Option value="true">Yes</Option>
                <Option value="false">No</Option>
              </Select>
            </div>
            <div className="form-section">
              <button className="form-dashboard-btn" onClick={handleSell}>
                Sell Product
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default CreateProduct;
