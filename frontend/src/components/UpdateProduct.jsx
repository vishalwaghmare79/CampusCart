import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getProductById, updateProduct } from "../services/productService";
import { getAllCategories } from "../services/categoryService";

const { Option } = Select;

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { token, user } = auth;
  const { role } = user;

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [shipping, setShipping] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await getProductById(id, token);
        if (productRes.success) {
          const product = productRes.product;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category._id);
          setQuantity(product.quantity);
          setShipping(product.shipping);
          setPreviewImage(product.image.url);
        }

        const categoryRes = await getAllCategories();
        if (categoryRes.success) {
          setCategories(categoryRes.categories);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !price || !description || !category || !quantity) {
      return toast.error("All fields are required");
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      if (image) productData.append("image", image);

      const res = await updateProduct(id, productData);

      if (res.success) {
        toast.success(res.message);
        if (role === 1) {
          navigate("/admin/dashboard/manage-products");
        } else {
          navigate("/user/dashboard/manage-products");
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } 
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Product</h1>
          <form onSubmit={handleUpdate} className="space-y-6">
              {/* Category Select */}
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
                  value={category}
                >
                  {categories.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Image Upload */}
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
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      }}
                      className="sr-only"
                    />
                  </label>
                </div>
                {previewImage && (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="product_image"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Product Name */}
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

              {/* Product Description */}
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

              {/* Product Price */}
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

              {/* Product Quantity */}
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

              {/* Shipping Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Available
                </label>
                <Select
                  className="w-full"
                  placeholder="Select shipping option"
                  size="large"
                  onChange={(value) => setShipping(value === "true")}
                  value={shipping ? "true" : "false"}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Update Product
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;