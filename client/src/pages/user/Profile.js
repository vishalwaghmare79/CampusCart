import React from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/auth";

function Profile() {
  const [auth] = useAuth();
  const { name, address, email, phone } = auth?.user || {};

  return (
    <div className="dashboard">
      <div className="sidebar">
        <UserMenu />
      </div>
      <div className="content">
        <h1 className="dashboard-title">Welcome to the Dashboard</h1>
        <div className="user-info">
          <p><span className="user-label">Name:</span>{name}</p>
          <p><span className="user-label">Address:</span>{address}</p>
          <p><span className="user-label">Email:</span>{email}</p>
          <p><span className="user-label">Phone:</span>{phone}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
