import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons from react-icons

const UserDashboardMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg focus:outline-none"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar Menu */}
      <div
        className={`w-64 min-h-screen bg-gray-800 text-white p-4 fixed md:relative transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <nav className="space-y-3">
          <NavLink
            to="/user/dashboard/profile"
            className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/user/dashboard/manage-products"
            className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            My Products
          </NavLink>
          <NavLink
            to="/user/dashboard/orders"
            className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            My Orders
          </NavLink>
          <NavLink
            to="/user/dashboard/wishlist"
            className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/user/dashboard/sell-product"
            className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Sell a Product
          </NavLink>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default UserDashboardMenu;