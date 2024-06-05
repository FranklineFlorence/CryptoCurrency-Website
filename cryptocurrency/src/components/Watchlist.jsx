import React from 'react';
import { Link } from 'react-router-dom';

function Watchlist({ watchlist, removeFromWatchlist }) {
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
              <th>Action</th>
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
                <td>
                  <button onClick={() => removeFromWatchlist(crypto.id)}>
                    Remove
                  </button>
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
