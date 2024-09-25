import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { useWishlist } from "../../context/wishlist";

function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const { wishlist } = useWishlist();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Logout Successfully");
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar wrapper">
        <h1 className="navbar-logo">
          <NavLink to="/">Campus<span>Cart</span></NavLink>
        </h1>

        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink to="/" className="nav-item-a" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/user/wishlist" className="nav-item-a" activeClassName="active">
                <Badge count={wishlist?.length} overflowCount={5}>
                  <i className="nav-icon ri-heart-line"></i>
                </Badge>
                <span>wishlist</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-item-a" activeClassName="active">
                <Badge count={cart?.length} overflowCount={5}>
                  <i className="nav-icon ri-shopping-bag-line"></i>
                </Badge>
                <span>cart</span>
              </NavLink>
            </li>
            <li className="nav-item user-dropdown">
              {!auth?.user ? (
                <>
                  <NavLink to="/register" className="auth-button" activeClassName="active">
                    Register
                  </NavLink>
                  <NavLink to="/login" className="auth-button" activeClassName="active">
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <button onClick={toggleDropdown} className="user-button">
                    <i className="nav-icon ri-user-line"></i>
                    <span>
                      {auth?.user?.name} <i className="ri-arrow-down-s-line"></i>
                    </span>
                  </button>

                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                          activeClassName="active"
                          onClick={handleDropdownItemClick}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            handleLogout();
                            handleDropdownItemClick(); 
                          }}
                          to="/login"
                          className="dropdown-item"
                          activeClassName="active"
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

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav">
        <NavLink to="/" className="bottom-nav-link" activeClassName="active">
          <i className="ri-home-line"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to="/user/wishlist" className="bottom-nav-link" activeClassName="active">
        <Badge count={wishlist?.length} overflowCount={5}>
          <i className="ri-heart-line"></i>
          </Badge>
          <span>Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className="bottom-nav-link" activeClassName="active">
        <Badge count={cart?.length} overflowCount={5}>
          <i className="ri-shopping-bag-line"></i>
          </Badge>
          <span>Cart</span>
        </NavLink>
        {!auth?.user ? (
          <NavLink to="/login" className="bottom-nav-link" activeClassName="active">
            <i className="ri-user-line"></i>
            <span>Login</span>
          </NavLink>
        ) : (
          <>
            <button onClick={toggleMobileDropdown} className="bottom-nav-link">
              <i className="ri-user-line"></i>
              <span>{auth?.user?.name}</span>
            </button>
            {mobileDropdownOpen && (
              <ul className="mobile-dropdown-menu">
                <li>
                  <NavLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="mobile-dropdown-item"
                    activeClassName="active"
                    onClick={() => setMobileDropdownOpen(false)} 
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => {
                      handleLogout();
                      setMobileDropdownOpen(false); 
                    }}
                    to="/login"
                    className="mobile-dropdown-item"
                    activeClassName="active"
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

export default Header;
