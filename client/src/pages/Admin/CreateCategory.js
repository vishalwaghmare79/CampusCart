import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal } from "antd";
import CategoryForm from "./../../components/Form/CategoryForm";

function CreateCategory() {
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
        setName(""); // Clear input after successful submission
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
        getAllCategory(); // Refresh the categories list after deletion
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the category");
    }
  };

  return (
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
          />
        </div>

        <div className="table-section">
          <table className="category-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td className="actions">
                    <Button
                      type="primary"
                      className="action-btn edit-btn"
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
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          />
        </Modal>
      </div>
    </div>
  );
}

export default CreateCategory;
