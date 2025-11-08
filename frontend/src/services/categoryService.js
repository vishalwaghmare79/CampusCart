import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createCategory = async (formData) => {
    const res = await axios.post(`${API_BASE_URL}/category/create-category`, formData);
    return res.data;
  };

export const getAllCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/category/get-category`);
  return res.data;
};

export const updateCategory = async (id, formData) => {
    const res = await axios.put(`${API_BASE_URL}/category/update-category/${id}`, formData);
    return res.data;
  };
  

export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/category/delete-category/${id}`);
  return res.data;
};
