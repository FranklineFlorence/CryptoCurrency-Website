// Watchlist.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNotification} from './NotificationContext';

function Watchlist({ watchlist, removeFromWatchlist, storeNotificationInProfile }) {
  const { addNotification } = useNotification(); // Access addNotification from NotificationContext

  const handleRemoveFromWatchlist = (crypto) => {
    removeFromWatchlist(crypto.id);
    toast.info(`${crypto.name} removed from watchlist.`);
    storeNotificationInProfile(`${crypto.name} removed from watchlist.`);
    addNotification({ message: `${crypto.name} removed from watchlist.` });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
                  <button onClick={() => handleRemoveFromWatchlist(crypto)}>
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
