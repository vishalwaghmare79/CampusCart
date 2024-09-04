import React from "react";
import AdminMenu from "./AdminMenu";

function CreateCategory() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <AdminMenu />
      </div>
      <div className="content">
        <h1>Create Category</h1>
      </div>
    </div>
  );
}

export default CreateCategory;
