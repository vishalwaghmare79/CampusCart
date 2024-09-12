import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="sidebar-menu">
      <h4 className="menu-title">Admin Panel</h4>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink 
            to="/dashboard/admin/manage-category" 
            className={({ isActive }) => isActive ? "menu-link active-link" : "menu-link"}
          >
            Manage Category
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink 
            to="/dashboard/admin/users" 
            className={({ isActive }) => isActive ? "menu-link active-link" : "menu-link"}
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
