import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../services/categoryService";
import CategoryForm from "./CategoryForm";

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updateName, setUpdateName] = useState("");
    const [updateImage, setUpdateImage] = useState(null);
  
    // Fetch all categories
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res.success) {
          setCategories(res.categories);
        }
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    // Create a new category
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name || !image) {
        return toast.error("Please provide category name and image");
      }
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
  
        const res = await createCategory(formData);
        if (res.success) {
          toast.success(res.message);
          setName("");
          setImage(null);
          fetchCategories();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Error creating category");
      }
    };
  
    // Update category
    const handleUpdate = async (e) => {
      e.preventDefault();
      if (!selected) return;
      
      try {
        const formData = new FormData();
        formData.append("name", updateName);
        if (updateImage) formData.append("image", updateImage);
  
        const res = await updateCategory(selected._id, formData);
        if (res.success) {
          toast.success(res.message);
          setIsModalOpen(false);
          setUpdateName("");
          setUpdateImage(null);
          fetchCategories();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Error updating category");
      }
    };
  
    // Delete category
    const handleDelete = async (id) => {
      try {
        const res = await deleteCategory(id);
        if (res.success) {
          toast.success(res.message);
          fetchCategories();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Error deleting category");
      }
    };
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Manage Categories</h1>
  
        {/* Create Category Form */}
        <div className="mb-6">
          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} setImage={setImage} buttonName="Create Category" />
        </div>
  
        {/* Category List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <div key={category._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-3">
              <img src={category.image.url} alt={category.name} className="w-32 h-32 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setUpdateName(category.name);
                    setUpdateImage(null);
                    setSelected(category);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Update Category Modal */}
        <Modal title="Edit Category" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
          <CategoryForm handleSubmit={handleUpdate} value={updateName} setValue={setUpdateName} setImage={setUpdateImage} buttonName="Update Category" />
        </Modal>
      </div>
    );
  }
  
  export default ManageCategory;