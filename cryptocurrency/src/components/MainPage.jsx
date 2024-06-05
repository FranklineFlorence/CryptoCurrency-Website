import React from 'react';
import './MainPage.css';
import Watchlist from './Watchlist';

/**
 * MainPage component that displays the main page content.
 */
function MainPage() {
  return (
    <div className="main-page">
      <section className="intro-section">
        <h2>Welcome to the Cryptocurrency Analytics Platform</h2>
        <p>Get real-time data, historical charts, and manage your watchlist with our comprehensive platform.</p>
      </section>
      <section className="info-section">
        <div className="info-container">
          <h3>Real-Time Data</h3>
          <p>Access up-to-date data on various cryptocurrencies including prices, market cap, and volume.</p>
        </div>
        <div className="info-container">
          <h3>Interactive Charts</h3>
          <p>Visualize market trends and historical data with our interactive charts.</p>
        </div>
        <div className="info-container">
          <h3>Watchlist Management</h3>
          <p>Track your favorite cryptocurrencies and manage your personal watchlist.</p>
        </div>
      </section>
      <section className="additional-info">
        <h2>Stay Informed</h2>
        <p>Join our community to receive the latest updates and insights on the cryptocurrency market.</p>
      </section>
    </div>
  );
}

export default MainPage;
