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
      </div>
    </div>
  );
}

export default CreateProduct;
