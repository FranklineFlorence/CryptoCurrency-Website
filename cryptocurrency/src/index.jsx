// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { WatchlistProvider } from './contexts/WatchlistContext'; // Import the WatchlistProvider
import './index.css';

// Render the App component wrapped in WatchlistProvider
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
