import React from "react";
import { NavLink,  } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-logo">
          <NavLink to="/">
            Shop<span>Ease</span>
          </NavLink>
        </h1>
        
        <div>
          <ul className="nav-links">
          <li className="nav-item">
              <NavLink to="/wishlist" className="nav-item-a">
                <i className="nav-icon ri-heart-line"></i>
                <span className="nav-icon-text">Wishlist</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-item-a">
                <i className="nav-icon ri-shopping-bag-line"></i>
                <span className="nav-icon-text">Cart</span>
              </NavLink>
            </li>
            <li className="nav-item">
              {!auth.user ? (
                <>
                  <NavLink 
                    to="/register" 
                    className={({ isActive }) => isActive ? "auth-button active" : "auth-button"}
                  >
                    Register
                  </NavLink>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => isActive ? "auth-button active" : "auth-button"}
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <NavLink 
                  onClick={handleLogout} 
                  to="/login" 
                  className="auth-button"
                >
                  Logout
                </NavLink>
              )}
            </li>

            
          </ul>
        </div>
      </nav>
      
      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav">
        <NavLink to="/" className="bottom-nav-link">
          <i className="ri-home-line"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to="/wishlist" className="bottom-nav-link">
          <i className="ri-heart-line"></i>
          <span>Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className="bottom-nav-link">
          <i className="ri-shopping-bag-line"></i>
          <span>Cart</span>
        </NavLink>
        {!auth.user ? (
          <NavLink to="/login" className="bottom-nav-link">
            <i className="ri-user-line"></i>
            <span>Login</span>
          </NavLink>
        ) : (
          <NavLink onClick={handleLogout} to="/login" className="bottom-nav-link">
            <i className="ri-logout-box-line"></i>
            <span>Logout</span>
          </NavLink>
        )}
      </nav>
    </>
  );
}

export default Header;
