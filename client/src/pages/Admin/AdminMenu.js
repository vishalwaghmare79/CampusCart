import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <div className="sidebar-menu">
      <h4 className="menu-title">
      <NavLink to="/dashboard/admin/">Admin Panel</NavLink>
      </h4>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink
            to="/dashboard/admin/manage-category"
            className={({ isActive }) =>
              isActive ? "menu-link active-link" : "menu-link"
            }
          >
            Manage Category
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/dashboard/admin/manage-orders"
            className={({ isActive }) =>
              isActive ? "menu-link active-link" : "menu-link"
            }
          >
            Manage Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
