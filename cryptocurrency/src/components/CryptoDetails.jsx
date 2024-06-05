// CryptoDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './CryptoDetails.css';

/**
 * CryptoDetails component that fetches and displays detailed information about a specific cryptocurrency.
 * @returns {JSX.Element} The rendered component.
 */
function CryptoDetails() {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState({});
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCryptoDetails(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency details:', error);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  useEffect(() => {
    if (cryptoDetails.market_data) {
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
          );
          const data = await response.json();
          setChartData(processHistoricalData(data.prices));
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }
      };

      fetchHistoricalData();
    }
  }, [cryptoDetails]);

  const processHistoricalData = (prices) => {
    const labels = prices.map((entry) => new Date(entry[0]).toLocaleDateString());
    const values = prices.map((entry) => entry[1]);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Price',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    };
  };

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById('historicalChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              suggestedMin: 0,
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div className="crypto-details">
      <h1>{cryptoDetails.name}</h1>
      <img src={cryptoDetails.image?.large} alt={cryptoDetails.name} />
      <div className="details">
        <p>Current Price: ${cryptoDetails.market_data?.current_price?.usd}</p>
        <p>Market Cap: ${cryptoDetails.market_data?.market_cap?.usd}</p>
        <p>24h Volume: ${cryptoDetails.market_data?.total_volume?.usd}</p>
      </div>
      <div style={{ width: '800px', height: '400px' }}>
        <canvas id="historicalChart"></canvas>
      </div>
      <button className="watchlist-button">Add to Watchlist</button>
    </div>
  );
}

export default CryptoDetails;
