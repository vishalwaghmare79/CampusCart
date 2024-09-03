import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Dashboard from "./pages/user/Dashboard";
import { PrivateRoute } from "./Routes/Private";
import Register from "./pages/Auth/Register";
import Login from './pages/Auth/Login';

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
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
