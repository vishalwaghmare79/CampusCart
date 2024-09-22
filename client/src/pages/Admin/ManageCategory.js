import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
import DynamicHelmet from "../../components/Common/DynamicHelmet";

function ManageCategory () {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/create-category`;
      const res = await axios.post(API_BASE_URL, { name });
      if (res.data?.success) {
        toast.success(res.data.message);
        getAllCategory();
        setName(""); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/get-category`;
      const res = await axios.get(API_BASE_URL);
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selected) return;
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`;
      const res = await axios.put(API_BASE_URL, { name: updateName });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
        setSelected(null);
        setUpdateName("");
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the category");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`;
      const res = await axios.delete(API_BASE_URL);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the category");
    }
  };

  return (
   <>
    <DynamicHelmet
      title="Manage Categories - Admin Dashboard | CampusCart"
      description="Efficiently manage and organize product categories on the CampusCart admin dashboard. Ensure smooth navigation for users in the student marketplace."
      keywords="admin, manage categories, CampusCart, category management, product categories, student marketplace"
    />
    <div className="dashboard">
      <div className="sidebar">
        <AdminMenu />
      </div>
      <div className="content">
        <h1 className="content-title">Manage Categories</h1>

        <div className="form-section">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
            buttonName="Create"
          />
        </div>

        <div className="categories-list">
          {categories?.map((category) => (
            <div key={category._id} className="category-item">
              <div className="category-name">{category.name}</div>
              <div className="category-actions">
                <Button
                  type="primary"
                  className="update-button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setUpdateName(category.name);
                    setSelected(category);
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="danger"
                  className="delete-button"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          title="Edit Category"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <CategoryForm
            value={updateName}
            setValue={setUpdateName}
            handleSubmit={handleUpdate}
            buttonName="Update"
          />
        </Modal>
      </div>
    </div>
   </>
  );
}

export default ManageCategory;
