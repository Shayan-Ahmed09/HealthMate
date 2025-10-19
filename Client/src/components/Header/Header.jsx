// Header.js
import { Link, NavLink } from "react-router";
import "./Header.css";

const Header = () => {
  return (
    <header className="custom-header">
      <nav className="custom-nav">
        <div className="nav-container">
          <Link to="/" className="logo-link">
            <img
              src="./logo.png"
              className="logo-img"
              alt="Logo"
            />
          </Link>
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Log in
            </Link>
            <Link to="/register" className="start-btn">
              Register
            </Link>
          </div>
          <div className="menu-links" id="mobile-menu-2">
            <ul className="nav-list">
              {["/", "/about", "/contact"].map((path, index) => {
                const labels = ["Home", "Upload/Summary Report", "VITAL RECORDS"];
                return (
                  <li key={index}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `nav-item ${isActive ? "active-link" : ""}`
                      }
                    >
                      {labels[index]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

