import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createProduct = async (productData) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/v1/product/create-product`,
      productData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async ( id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/product/get-product/${id}`,{
      headers: {
        Authorization : token
      }
  });
    return response.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: "Failed to fetch products" };
  }
};

export const getAllProducts = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/product/get-products`,{
      headers: {
        Authorization : token
      }
  });
    return response.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: "Failed to fetch products" };
  }
};

export const getProductsByCategory = async (categoryId, token) => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/product/get-products/${categoryId}`);
  return response.data;
};

export const getUserProducts = async (token) => {
  
  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/product/user-products`,{
      headers: {
        Authorization : token
      }
  });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/v1/product/update-product/${id}`,
      productData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/v1/product/delete-product/${id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
