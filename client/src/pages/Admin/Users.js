import React from "react";
import AdminMenu from "./AdminMenu";

function Users() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <AdminMenu />
      </div>
      <div className="content">
        <h1>All Users</h1>
      </div>
    </div>
  );
}

export default Users;
