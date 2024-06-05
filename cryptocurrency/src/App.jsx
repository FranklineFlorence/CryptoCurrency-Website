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
import './App.css';

/**
 * App component that serves as the root component of the application.
 * It includes the header and routing to different pages.
 */
function App() {
  // State to store the watchlist
  const [watchlist, setWatchlist] = useState([]);

  // Function to add a cryptocurrency to the watchlist
  const addToWatchlist = (crypto) => {
    if (!watchlist.find((item) => item.id === crypto.id)) {
      setWatchlist([...watchlist, crypto]);
    }
  };

  // Function to remove a cryptocurrency from the watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((crypto) => crypto.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/data"
              element={<Data addToWatchlist={addToWatchlist} />}
            />
            <Route path="/visual" element={<Visual />} />
            <Route
              path="/watchlist"
              element={<Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />}
            />
            <Route path="/crypto/:id" element={<CryptoDetails />} />
            <Route path="/convert" element={<CryptoConverter />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
