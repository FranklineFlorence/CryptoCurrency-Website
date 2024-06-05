// Watchlist.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Watchlist() {
  // State to store the user's watchlist
  const [watchlist, setWatchlist] = useState([]);

  // Effect to fetch real-time data for each cryptocurrency in the watchlist
  useEffect(() => {
    // Function to fetch real-time data for a single cryptocurrency
    const fetchCryptoData = async (id) => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
        return null;
      }
    };

    // Function to fetch real-time data for all cryptocurrencies in the watchlist
    const fetchWatchlistData = async () => {
      const updatedWatchlist = await Promise.all(
        watchlist.map(async (crypto) => {
          const data = await fetchCryptoData(crypto.id);
          return data;
        })
      );
      setWatchlist(updatedWatchlist);
    };

    if (watchlist.length > 0) {
      fetchWatchlistData();
    }
  }, [watchlist]);

  return (
    <div>
      <h1>Your Watchlist</h1>
      <p>Manage your favorite cryptocurrencies here.</p>
      {watchlist.length > 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {watchlist.map((crypto) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
}

export default Watchlist;
