import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

/**
 * Header component that displays the navigation menu.
 */
function Header() {
  return (
    <header className="App-header">
      <h1>CRYPTOVERSE</h1>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/data">DATA</Link>
        <Link to="/visual">VISUAL</Link>
        <Link to="/watchlist">WATCHLIST</Link>
        <Link to="/convert">ANALYTICS</Link>
        <Link to="/profile">PROFILE</Link> {/* Link to User Profile Page */}
        <Link to="/login">LOGIN</Link> {/* Link to Login/Register Page */}
      </nav>
    </header>
  );
}

export default Header;
