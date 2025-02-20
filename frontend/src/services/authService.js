import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (email, password) => {
  
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error; 
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, userData);
    return res.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};