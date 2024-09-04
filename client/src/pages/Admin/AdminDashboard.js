import React from "react";
import AdminMenu from "./AdminMenu";

function AdminDashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <AdminMenu />
      </div>
      <div className="content">
        <h1>Welcome to the Admin Dashboard</h1>
      </div>
    </div>
  );
}

export default AdminDashboard;
