import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import brand_logo from '../assets/logo.png'; // Import the logo image

function Header() {
  return (
    <header className="App-header">
      <div className="brand-container">
        <img src={brand_logo} alt="Cryptoverse Logo" className="brand-logo" />
        <h1 className="brand-name">CRYPTOVERSE</h1>
      </div>
      <nav>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/" className="menu-link">HOME</Link>
          </li>
          <li className="menu-item">
            <Link to="/data" className="menu-link">DATA</Link>
          </li>
          <li className="menu-item">
            <Link to="/visual" className="menu-link">VISUAL</Link>
          </li>
          <li className="menu-item">
            <Link to="/watchlist" className="menu-link">WATCHLIST</Link>
          </li>
          <li className="menu-item">
            <Link to="/convert" className="menu-link">ANALYTICS</Link>
          </li>
          <li className="menu-item">
            <Link to="/market-depth" className="menu-link">MARKETDEPTH</Link>
          </li>
          <li className="menu-item">
            <Link to="/profile" className="menu-link">PROFILE</Link>
          </li>
          <li className="menu-item">
            <Link to="/login" className="menu-link">LOGIN</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
