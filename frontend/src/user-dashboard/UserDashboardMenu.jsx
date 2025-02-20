import React from "react";
import { NavLink } from "react-router-dom";

const UserDashboardMenu = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
      <nav className="space-y-3">
        <NavLink 
          to="/user/dashboard/profile" 
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Profile
        </NavLink>
        <NavLink 
          to="/user/dashboard/manage-products" 
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          My Products
        </NavLink>
        <NavLink 
          to="/user/dashboard/orders" 
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          My Orders
        </NavLink>
        <NavLink 
          to="/user/dashboard/wishlist" 
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Wishlist
        </NavLink>
        <NavLink 
          to="/user/dashboard/sell-product" 
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Sell a Product
        </NavLink>
      </nav>
    </div>
  );
};

export default UserDashboardMenu;
