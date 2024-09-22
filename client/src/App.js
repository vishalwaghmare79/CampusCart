import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { VerifyAdminRoute } from "./Routes/VerifyAdminRoute";
import { VerifyUserRoute } from "./Routes/VerifyUserRoute";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Orders from "./pages/User/Orders";
import Products from "./pages/User/Products";
import CartPage from "./pages/CartPage";
import ManageOrder from "./pages/Admin/ManageOrder";
import WishlistPage from "./pages/WishlistPage";
import UpdateProduct from "./pages/User/UpdateProduct";
import CreateProduct from "./pages/User/CreateProduct";
import ManageCategory from "./pages/Admin/ManageCategory";
import ProductDetails from "./pages/ProductDetails";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import "./App.css";
import "./styles/cart.css";
import "./styles/homePage.css";
import "./styles/authForm.css";
import "./styles/dashboard.css";
import "./styles/productDetailsPage.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />

          <Route element={<VerifyUserRoute />}>
            <Route path="/user/wishlist" element={<WishlistPage />} />
            <Route path="/dashboard/user" element={<UserDashboard />} />
            <Route
              path="/dashboard/user/create-product"
              element={<CreateProduct />}
            />
            <Route
              path="/dashboard/user/products/:productId"
              element={<UpdateProduct />}
            />
            <Route path="/dashboard/user/products" element={<Products />} />
            <Route path="/dashboard/user/orders" element={<Orders />} />
          </Route>

          <Route element={<VerifyAdminRoute />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route
              path="/dashboard/admin/manage-category"
              element={<ManageCategory />}
            />
            <Route
              path="/dashboard/admin/manage-orders"
              element={<ManageOrder />}
            />
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
