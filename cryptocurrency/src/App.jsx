// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Data from './components/Data';
import Visual from './components/Visual';
import Watchlist from './components/Watchlist';
import CryptoDetails from './components/CryptoDetails';
import CryptoConverter from './components/CryptoConverter'; // Import the new component
import './App.css';

/**
 * App component that serves as the root component of the application.
 * It includes the header and routing to different pages.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/data" element={<Data />} />
            <Route path="/visual" element={<Visual />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/crypto/:id" element={<CryptoDetails />} />
            <Route path="/convert" element={<CryptoConverter />} /> {/* Add route for CryptoConverter */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
