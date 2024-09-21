import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <div className="sidebar-menu">
      <h4 className="menu-title">
        <NavLink to="/dashboard/user/">Dashboard</NavLink>
      </h4>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) =>
              isActive ? "menu-link active-link" : "menu-link"
            }
          >
            Orders
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/dashboard/user/create-product"
            className={({ isActive }) =>
              isActive ? "menu-link active-link" : "menu-link"
            }
          >
            Sell Product
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/dashboard/user/products"
            className={({ isActive }) =>
              isActive ? "menu-link active-link" : "menu-link"
            }
          >
            Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
