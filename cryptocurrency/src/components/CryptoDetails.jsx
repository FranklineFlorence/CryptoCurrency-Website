import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './CryptoDetails.css';

function CryptoDetails() {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState({});
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [timeGranularity, setTimeGranularity] = useState('hourly'); // Default to hourly

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

  const fetchHistoricalData = async (granularity) => {
    let interval;
    if (granularity === 'hourly') {
      interval = 'hourly';
    } else if (granularity === 'daily') {
      interval = 'daily';
    } else {
      interval = 'weekly';
    }

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365&interval=${interval}`
      );
      const data = await response.json();
      setChartData(processHistoricalData(data.prices, granularity));
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    fetchHistoricalData(timeGranularity);
  }, [id, timeGranularity]);

  const processHistoricalData = (prices, granularity) => {
    if (!prices || !Array.isArray(prices)) return null;

    let labels;
    if (granularity === 'hourly') {
      labels = prices.map((entry) => new Date(entry[0]).toLocaleTimeString());
    } else if (granularity === 'daily') {
      labels = prices.map((entry) => new Date(entry[0]).toLocaleDateString());
    } else {
      labels = prices.map((entry) => new Date(entry[0]).toLocaleDateString());
    }

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
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (chartData) {
      const ctx = document.getElementById('historicalChart').getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              suggestedMin: Math.min(...chartData.datasets[0].data) - 10,
              ticks: {
                stepSize: 100, // Adjust the step size for the y-axis ticks
                beginAtZero: true,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  const handleTimeGranularityChange = (event) => {
    setTimeGranularity(event.target.value);
  };

  return (
    <div className="crypto-details">
      <h1>{cryptoDetails.name}</h1>
      <img src={cryptoDetails.image?.large} alt={cryptoDetails.name} />
      <div className="details">
        <p>Current Price: ${cryptoDetails.market_data?.current_price?.usd}</p>
        <p>Market Cap: ${cryptoDetails.market_data?.market_cap?.usd}</p>
        <p>24h Volume: ${cryptoDetails.market_data?.total_volume?.usd}</p>
      </div>
      <div className="time-granularity">
        <label htmlFor="timeGranularity">Time Granularity:</label>
        <select id="timeGranularity" value={timeGranularity} onChange={handleTimeGranularityChange}>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div id="historicalChartContainer">
        <canvas id="historicalChart"></canvas>
      </div>
    </div>
  );
}

export default CryptoDetails;