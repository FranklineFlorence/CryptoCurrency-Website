// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Data from './components/Data';
import Visual from './components/Visual';
import Watchlist from './components/Watchlist';
import CryptoDetails from './components/CryptoDetails';
import CryptoConverter from './components/CryptoConverter';
import UserProfilePage from './components/UserProfilePage';
import LoginRegisterPage from './components/LoginRegisterPage';
import MarketDepthAnalysis from './components/MarketDepthAnalysis';
import './App.css';
import { NotificationProvider } from './components/NotificationContext';
import { AuthProvider } from './components/AuthContext';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (crypto) => {
    if (!watchlist.find((item) => item.id === crypto.id)) {
      setWatchlist([...watchlist, crypto]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((crypto) => crypto.id !== id));
  };

  const storeNotificationInProfile = (notification) => {
    // Your implementation to store notification in profile
    console.log("Storing notification in profile:", notification);
    // Implement your logic to store notification in user's profile
    // e.g., make a request to your backend API to save the notification
  };

  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<MainPage />} />
                {/* Pass storeNotificationInProfile as a prop to Data */}
                <Route path="/data" element={<Data addToWatchlist={addToWatchlist} storeNotificationInProfile={storeNotificationInProfile} />} />
                <Route path="/visual" element={<Visual />} />
                <Route path="/watchlist" element={<Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} storeNotificationInProfile={storeNotificationInProfile} />} />
                <Route path="/crypto/:id" element={<CryptoDetails />} />
                <Route path="/convert" element={<CryptoConverter />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/login" element={<LoginRegisterPage />} />
                <Route path="/register" element={<LoginRegisterPage />} />
                <Route path="/market-depth" element={<MarketDepthAnalysis />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;