import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ setLoginUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setLoginUser("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-title"></span>
      </div>
      <div className="navbar-items-container">
        <ul className={`navbar-items ${showMenu ? 'show' : ''}`}>
          <li className="navbar-item">Quote</li>
          <li className="navbar-item">Weather</li>
          <li className="navbar-item">Todo</li>
          <li className="navbar-item">News</li>
        </ul>
      </div>
      <div className="logout-button" onClick={handleLogout}>
        Logout
      </div>
      <button className={`hamburger ${showMenu ? 'open' : ''}`} onClick={handleToggleMenu}>
        <span className="hamburger-icon" />
      </button>
    </nav>
  );
};

export default Navbar;
