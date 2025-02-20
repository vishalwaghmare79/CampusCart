import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { auth, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((prev) => !prev);
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">
          <NavLink to="/" className="text-blue-600 hover:text-blue-800">
            Campus<span className="text-orange-500">Cart</span>
          </NavLink>
        </h1>
        <div className="hidden md:block">
          <ul className="flex space-x-6 justify-center items-center">
          <li>
              <NavLink to="/" className="text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/dashboard/wishlist" className="relative text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                Wishlist
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {wishlist.length}
            </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="relative text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
                Cart
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
             {cart.length}
            </span>
              </NavLink>
            </li>
            <li className="relative">
              {!auth?.user ? (
                <>
                  <NavLink to="/register" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    Register
                  </NavLink>
                  <button onClick={handleLoginRedirect} className="px-4 py-2 ml-2 text-white bg-green-600 rounded hover:bg-green-700">
                    Login
                  </button>
                </>
              ) : (
                <>
                  <button onClick={toggleDropdown} className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="ml-1">
                      {auth?.user?.name} <i className="ri-arrow-down-s-line"></i>
                    </span>
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute z-20 right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      <li>
                        <NavLink
                          to={`/${auth?.user?.role === 1 ? "admin/dashboard" : "user/dashboard"}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                          onClick={handleDropdownItemClick}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            logout();
                            handleDropdownItemClick();
                          }}
                          to="/login"
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around p-2 bg-white shadow-md md:hidden z-50">
        <NavLink to="/" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <i className="ri-home-line text-2xl"></i>
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/search" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <i className="ri-search-line text-2xl"></i>
          <span className="text-xs">Search</span>
        </NavLink>
        <NavLink to="/user/dashboard/wishlist" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <div className="relative">
            <i className="ri-heart-line text-2xl"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {wishlist.length}
            </span>
          </div>
          <span className="text-xs">Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className="flex flex-col items-center text-gray-700 hover:text-blue-600" activeClassName="text-blue-600">
          <div className="relative">
            <i className="ri-shopping-bag-line text-2xl"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cart.length}
            </span>
          </div>
          <span className="text-xs">Cart</span>
        </NavLink>
        {!auth?.user ? (
          <button onClick={handleLoginRedirect} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <i className="ri-user-line text-2xl"></i>
            <span className="text-xs">Login</span>
          </button>
        ) : (
          <>
            <button onClick={toggleMobileDropdown} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
              <i className="ri-user-line text-2xl"></i>
              <span className="text-xs">{auth?.user?.name}</span>
            </button>
            {mobileDropdownOpen && (
              <ul className="absolute bottom-16 right-2 w-48 bg-white border rounded shadow-lg z-50">
                <li>
                  <NavLink
                    to={`/${auth?.user?.role === 1 ? "admin/dashboard" : "user/dashboard"}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                    onClick={() => setMobileDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      logout();
                      setMobileDropdownOpen(false);
                    }}
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;