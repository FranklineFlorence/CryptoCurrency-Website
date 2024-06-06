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
