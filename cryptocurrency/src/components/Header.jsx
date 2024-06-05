import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

/**
 * Header component that displays the navigation menu.
 */
function Header() {
  return (
    <header className="App-header">
      <h1>CryptoVerse</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/data">Data</Link>
        <Link to="/visual">Visual</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/convert">Converter</Link> {/* Add link to CryptoConverter */}
      </nav>
    </header>
  );
}

export default Header;
