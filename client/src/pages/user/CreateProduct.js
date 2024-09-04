import React from "react";
import UserMenu from "./UserMenu";

function CreateProduct() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <UserMenu />
      </div>
      <div className="content">
        <h1>Sell Product</h1>
        {/* Form for creating a product can go here */}
      </div>
    </div>
  );
}

export default CreateProduct;
