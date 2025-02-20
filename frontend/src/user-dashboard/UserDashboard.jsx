import React from "react";
import { Outlet } from "react-router-dom";
import UserDashboardMenu from "./UserDashboardMenu";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <UserDashboardMenu />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
