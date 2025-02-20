import React from "react";
import { NavLink } from "react-router-dom";

const AdminDashboardMenu = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-3">
        <NavLink
          to="/admin/dashboard/profile"
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Profile
        </NavLink>
        <NavLink
          to="/admin/dashboard/manage-categories"
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Manage Categories
        </NavLink>
        <NavLink
          to="/admin/dashboard/manage-products"
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Manage Products
        </NavLink>
        <NavLink
          to="/admin/dashboard/manage-orders"
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Manage Orders
        </NavLink>
        <NavLink
          to="/admin/dashboard/manage-users"
          className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Manage Users
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminDashboardMenu;
