import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Protected Routes Layouts
import UserProtectedLayout from "./routes/UserProtectedLayout";
import AdminProtectedLayout from "./routes/AdminProtectedLayout";

// User Dashboard Components
import UserDashboard from "./user-dashboard/UserDashboard";
import Profile from "./user-dashboard/Profile";
import ManageProducts from "./components/ManageProducts";
import Orders from "./user-dashboard/Orders";
import Wishlist from "./user-dashboard/Wishlist";
import Sellproduct from "./user-dashboard/Sellproduct";
import UpdateProduct from "./components/UpdateProduct";

// Admin Dashboard Components
import AdminDashboard from "./admin-dashboard/AdminDashboard";
import ManageCategory from "./admin-dashboard/ManageCategory";
import ManageOrders from "./admin-dashboard/ManageOrders";
import ManageUsers from "./admin-dashboard/ManageUsers";

// Product Details
import ProductDetailsPage from "./components/ProductDetailsPage";

const App = () => {
  return (
    <Router>
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductPage />} />
        <Route
          path="/products/productdetailspage/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User Protected Routes */}
        <Route path="/user" element={<UserProtectedLayout />}>
          <Route path="dashboard" element={<UserDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="sell-product" element={<Sellproduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
          </Route>
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminProtectedLayout />}>
          <Route path="dashboard" element={<AdminDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-categories" element={<ManageCategory />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;