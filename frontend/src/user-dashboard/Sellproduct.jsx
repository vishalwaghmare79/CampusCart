import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../services/categoryService";
import { createProduct } from "../services/productService";

const { Option } = Select;

const SellProduct = () => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res.success) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSell = async (e) => {
    e.preventDefault();

    if (!name || !price || !description || !category || !quantity || !image) {
      return toast.error("All fields are required");
    }
    if (image.size > 1048576) {
      return toast.error("Image size should be less than 1MB");
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
      const res = await createProduct(productData);

      if (res.success) {
        toast.success(res.message);
        navigate("/user/dashboard/my-products");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sell Product</h1>
          <form onSubmit={handleSell} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select
                  className="w-full"
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  onChange={(value) => setCategory(value)}
                >
                  {categories.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="sr-only"
                    />
                  </label>
                </div>
                {image && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product_image"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter product name"
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  placeholder="Enter product description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  placeholder="Enter product price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter product quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Available
                </label>
                <Select
                  className="w-full"
                  placeholder="Select shipping option"
                  size="large"
                  onChange={(value) => setShipping(value === "true")}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Sell Product
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default SellProduct;