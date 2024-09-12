import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Dashboard from "./pages/User/Dashboard";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/User/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import { VerifyUserRoute } from "./Routes/VerifyUserRoute";
import { VerifyAdminRoute } from "./Routes/VerifyAdminRoute";
import Products from "./pages/User/Products";
import UpdateProduct from "./pages/User/UpdateProduct";
import ManageCategory from "./pages/Admin/ManageCategory";

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route element={<VerifyUserRoute />}>
            <Route path="/dashboard/user" element={<Dashboard />} />
            <Route path="/dashboard/user/create-product" element={<CreateProduct />} />
            <Route path="/dashboard/user/products/:slug" element={<UpdateProduct />} />
            <Route path="/dashboard/user/products" element={<Products />} />
            <Route path="/dashboard/user/orders" element={<Orders />} />
            <Route path="/dashboard/user/Profile" element={<Profile />} />
          </Route>

          <Route element={<VerifyAdminRoute />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/manage-category" element={<ManageCategory />} />
            <Route path="/dashboard/admin/users" element={<Users />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
