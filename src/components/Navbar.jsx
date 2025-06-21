// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          Product Dashboard
        </Link>

        {/* Navbar Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
            <li className="nav-item">
  <Link to="/analytics" className="nav-link">
    Analytics
  </Link>
</li>
<li className="nav-item">
  <Link to="/favorites" className="nav-link">
    Favorites
  </Link>
</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
