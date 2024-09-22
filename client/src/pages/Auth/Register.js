import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DynamicHelmet from "../../components/Common/DynamicHelmet";

const Register = () => {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the environment variable for the API URL
      const apiUrl = `${process.env.REACT_APP_API}/api/v1/auth/register`;

      // Send a POST request to the signup endpoint
      const res = await axios.post(apiUrl, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (res.data.success) {
        // If signup is successful, show a success message and navigate to Sign In
        toast.success(res.data.message);
        navigate("/login");
      } else {
        // If signup fails, show an error message
        toast.error(res.data.message);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <DynamicHelmet
        title="Register - CampusCart"
        description="Create a new account on CampusCart to start buying and selling products within the student community."
        keywords="register, signup, create account, CampusCart"
      />
      <div className="auth-page register-form">
        <div className="form">
          <h1 className="form-title">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-div">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Name"
                required
              />
            </div>
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
            <div className="input-div">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                placeholder="Phone"
                required
              />
            </div>
            <div className="input-div">
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
                placeholder="Address"
                required
              />
            </div>
            <button type="submit" className="form-button">
              Register
            </button>
            <p className="form-link">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="form-btn">
                <strong>Login</strong>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
