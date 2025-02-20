import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const getAuthFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : { user: null, token: "" };
  } catch (error) {
    console.error("Error parsing auth from localStorage:", error);
    return { user: null, token: "" };
  }
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getAuthFromLocalStorage());

  useEffect(() => {
    if (auth.token) {      
      axios.defaults.headers.common["Authorization"] = auth.token
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("auth");
    }
  }, [auth]);  

  const logout = () => {
    setAuth({ user: null, token: "" });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
