import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu () {
  return (
    <div className="sidebar-menu">
      <h4 className="menu-title">Dashboard</h4>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink 
            to="/dashboard/user/Profile" 
            className="menu-link" 
            activeClassName="active-link"
          >
            Profile
          </NavLink>
        </li>
        <li className="menu-item">
        <NavLink 
            to="/dashboard/user/orders" 
            className="menu-link" 
            activeClassName="active-link"
          >
            Orders
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/dashboard/user/create-product" 
            className="menu-link" 
            activeClassName="active-link"
          >
            Sell Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
