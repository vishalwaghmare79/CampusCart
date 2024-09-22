import React from "react";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/auth";
import DynamicHelmet from "../../components/Common/DynamicHelmet";

function AdminDashboard() {
  const [auth] = useAuth();
  const { name, role, address, email, phone } = auth?.user || {};
  return (
    <>
     <DynamicHelmet
        title="Admin Dashboard - CampusCart"
        description="Manage products, users, and orders on the CampusCart admin dashboard. Oversee the student marketplace efficiently."
        keywords="admin, dashboard, CampusCart, product management, user management, order management, student marketplace"
      />
    <div className="dashboard">
      <div className="sidebar">
        <AdminMenu />
      </div>
      <div className="content">
      <h1>Welcome to Your Admin Panel, {name || 'Admin'}!</h1>
        <div className="user-info">
          <p>
            <span className="user-label">Name:</span>
            {name}
          </p>
          <p>
            <span className="user-label">Role:</span>
            {role === 1 ? "admin" : "user"}
          </p>
          <p>
            <span className="user-label">Address:</span>
            {address}
          </p>
          <p>
            <span className="user-label">Email:</span>
            {email}
          </p>
          <p>
            <span className="user-label">Phone:</span>
            {phone}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
