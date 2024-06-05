import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Data.css';

function Data({ addToWatchlist, watchlist = [] }) {
  const [cryptoData, setCryptoData] = useState([]);
  const [thresholds, setThresholds] = useState({});

  // Fetch crypto data from API
  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
      );
      const data = await response.json();
      setCryptoData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCryptoData();

    // Load thresholds from localStorage
    const savedThresholds = JSON.parse(localStorage.getItem('thresholds')) || {};
    setThresholds(savedThresholds);

    // Set up interval to periodically fetch data and check thresholds
    const intervalId = setInterval(() => {
      fetchCryptoData();
      checkThresholds();
    }, 60000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (cryptoData.length > 0) {
      checkThresholds();
    }
  }, [cryptoData]);

  const isInWatchlist = (crypto) => {
    return watchlist.some((item) => item.id === crypto.id);
  };

  const handleAddToWatchlist = (crypto) => {
    addToWatchlist(crypto);
    toast.success(`${crypto.name} added to watchlist!`);
  };

  const handleRemoveFromWatchlist = (crypto) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== crypto.id);
    addToWatchlist(updatedWatchlist);
    toast.info(`${crypto.name} removed from watchlist.`);
  };

  const handleThresholdChange = (event, cryptoId) => {
    const value = event.target.value;
    setThresholds((prevThresholds) => ({
      ...prevThresholds,
      [cryptoId]: value,
    }));
  };

  const handleThresholdSubmit = (cryptoId) => {
    const threshold = thresholds[cryptoId];
    const updatedThresholds = {
      ...thresholds,
      [cryptoId]: threshold,
    };
    setThresholds(updatedThresholds);
    localStorage.setItem('thresholds', JSON.stringify(updatedThresholds));
    toast.success(`Threshold for ${cryptoId} set at $${threshold}`);
  };

  const handleThresholdRemove = (cryptoId) => {
    const updatedThresholds = { ...thresholds };
    delete updatedThresholds[cryptoId];
    setThresholds(updatedThresholds);
    localStorage.setItem('thresholds', JSON.stringify(updatedThresholds));
    toast.info(`Threshold for ${cryptoId} has been removed.`);
  };

  const checkThresholds = () => {
    cryptoData.forEach((crypto) => {
      const threshold = thresholds[crypto.id];
      if (threshold && crypto.current_price > threshold) {
        toast.info(`Price of ${crypto.name} has crossed your threshold of $${threshold}. Current price: $${crypto.current_price}`);
      }
    });
  };

  return (
    <div>
      <h1>Cryptocurrency Assets</h1>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {cryptoData.length > 0 ? (
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Logo</th>
              <th>Volume (USD 24Hr)</th>
              <th>Price (USD)</th>
              <th>Market Cap (USD)</th>
              <th>Change Percent (24Hr)</th>
              <th>Details</th>
              <th>Add to Watchlist</th>
              <th>Set Price Threshold</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => (
              <tr key={crypto.id}>
                <td>{crypto.market_cap_rank}</td>
                <td>{crypto.name}</td>
                <td>{crypto.symbol.toUpperCase()}</td>
                <td><img src={crypto.image} alt={crypto.name} width="25" height="25" /></td>
                <td>{crypto.total_volume}</td>
                <td>{crypto.current_price}</td>
                <td>{crypto.market_cap}</td>
                <td>{crypto.price_change_percentage_24h}</td>
                <td>
                  <Link to={`/crypto/${crypto.id}`}>Details</Link>
                </td>
                <td>
                  {isInWatchlist(crypto) ? (
                    <button onClick={() => handleRemoveFromWatchlist(crypto)}>
                      Remove
                    </button>
                  ) : (
                    <button onClick={() => handleAddToWatchlist(crypto)}>
                      Add
                    </button>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    value={thresholds[crypto.id] || ''}
                    onChange={(event) => handleThresholdChange(event, crypto.id)}
                    placeholder="Set threshold"
                  />
                  <button onClick={() => handleThresholdSubmit(crypto.id)}>Set</button>
                  <button onClick={() => handleThresholdRemove(crypto.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    ) : (
      <p>Data cannot be loaded...</p>
    )}
  </div>
);
}

export default Data;