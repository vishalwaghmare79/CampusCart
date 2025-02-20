import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardMenu from "./AdminDashboardMenu";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <AdminDashboardMenu />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
