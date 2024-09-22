import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DynamicHelmet from "../../components/Common/DynamicHelmet";

function Login() {
  // State variables to store email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const API_BASE_URL = `${process.env.REACT_APP_API}/api/v1/auth/login`;

      // Send a POST request to the login endpoint
      const res = await axios.post(API_BASE_URL, { email, password });

      if (res.data.success) {
        // If login is successful, show a success message and navigate to home
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        // If login fails, show an error message
        toast.error(res.data.message || "Failed to Login");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <DynamicHelmet
        title="Login - CampusCart"
        description="Login to CampusCart to access your account and start shopping or selling products within your student community."
        keywords="login, ecommerce, student marketplace, CampusCart"
      />
      <div className="auth-page login-form">
        <div className="form">
          <h1 className="form-title">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-div">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-div">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="form-button">
              Login
            </button>
            <div>
              <p className="forgot-password">Forgot password?</p>
              <p className="form-link">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="form-btn"
                >
                  <strong>Register</strong>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
