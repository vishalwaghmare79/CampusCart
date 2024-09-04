import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="sidebar-menu">
      <h4 className="menu-title">Admin Panel</h4>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink 
            to="/dashboard/admin/create-category" 
            className="menu-link" 
            activeClassName="active-link"
          >
            Create Category
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/dashboard/admin/users" 
            className="menu-link" 
            activeClassName="active-link"
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
