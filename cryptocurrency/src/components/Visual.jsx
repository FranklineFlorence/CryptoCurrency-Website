// Visual.jsx
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Visual({ coinList }) {
  const [chartData, setChartData] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin'); // Default selected coin

  useEffect(() => {
    fetchHistoricalData(selectedCoin);
  }, [selectedCoin]);

  const fetchHistoricalData = async (coin) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`
      );
      const data = await response.json();

      if (data.prices.length === 0) {
        console.error('No historical data fetched');
        return;
      }

      setChartData(processHistoricalData(data.prices));
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  const processHistoricalData = (prices) => {
    const labels = prices.map((entry) => new Date(entry[0]).toLocaleDateString());
    const values = prices.map((entry) => entry[1]);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Historical Data',
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
      createChart();
    }
  }, [chartData]);

  const createChart = () => {
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
  };

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  return (
    <div>
      <h1>Cryptocurrency Charts</h1>
      <div>
        <label htmlFor="coinSelect">Select a cryptocurrency:</label>
        <select id="coinSelect" value={selectedCoin} onChange={handleCoinChange}>
          {coinList.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: '800px', height: '400px' }}>
        <canvas id="historicalChart"></canvas>
      </div>
    </div>
  );
}

export default Visual;
