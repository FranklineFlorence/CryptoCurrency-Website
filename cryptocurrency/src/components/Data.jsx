// Data.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Data.css';

function Data({ setCoinList, addToWatchlist }) {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
        );
        const data = await response.json();
        setCryptoData(data);
        // Pass the list of coins to the parent component
        setCoinList(data.map((crypto) => ({ id: crypto.id, name: crypto.name })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoData();
  }, [setCoinList]);

  const handleAddToWatchlist = (id) => {
    // Call the function passed from the parent component to add the selected cryptocurrency to the watchlist
    addToWatchlist(id);
  };

  return (
    <div>
      <h1>Cryptocurrency Assets</h1>
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
              <th>Change Percent (24Hr)</th>
              <th>Details</th>
              <th>Add to Watchlist</th> {/* New column for the button */}
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
                <td>{crypto.price_change_percentage_24h}</td>
                <td>
                  <Link to={`/crypto/${crypto.id}`}>Details</Link>
                </td>
                <td>
                  <button onClick={() => handleAddToWatchlist(crypto.id)}>Add</button>
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
