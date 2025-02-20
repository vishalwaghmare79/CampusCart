import React from "react";
import {  useLocation, useNavigate }  from "react-router-dom";

const PaymentSummary = ({ total, handlePayment, loading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = localStorage.getItem("auth");

  const handlePaymentClick = () => {
    if (!auth) {
      navigate("/login", { state: { from: location.pathname } }); 
      return;
    }
    handlePayment();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Total: ₹{total}</h2>
      <button
        onClick={handlePaymentClick}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {loading
          ? "Processing..."
          : auth
          ? "Make Payment"
          : "Please Login to Checkout"}
      </button>
    </div>
  );
};

export default PaymentSummary;