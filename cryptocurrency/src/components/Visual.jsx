//src/components/Visual.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './Visual.css';

function Visual() {
  const { id } = useParams();
  const [cryptoList, setCryptoList] = useState([]);
  const [cryptoDetails, setCryptoDetails] = useState({});
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [timeGranularity, setTimeGranularity] = useState('daily'); // Default to daily
  const [selectedCrypto, setSelectedCrypto] = useState(id);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/${selectedCrypto}`);

        const data = response.data;
        setCryptoList(data);
      } catch (error) {
        console.error('Error fetching crypto list:', error);
      }
    };

    fetchCryptoList();
  }, []);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/${selectedCrypto}`);
        const data = response.data;
        setCryptoDetails(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency details:', error);
      }
    };

    fetchCryptoDetails();
  }, [selectedCrypto]);

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
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=365&interval=${interval}`
      );
      const data = response.data;
      setChartData(processHistoricalData(data.prices, granularity));
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    fetchHistoricalData(timeGranularity);
  }, [selectedCrypto, timeGranularity]);

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
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Change the background color
          borderColor: '#ba25e8',
          borderWidth: 1.5,
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

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  return (
    <div className="crypto-details">
      <h1 style={{ textTransform: 'uppercase' }}>{cryptoDetails.name}</h1>
      <div className="logo-container">
        <img src={cryptoDetails.image?.large} alt={cryptoDetails.name} className="logo" />
      </div>
      <div className="details-container">
        <div className="details-box">
          <h2 style={{ fontWeight: 'bold', color: '#ba25e8' }}>CURRENT PRICE</h2>
          <div className="details">
            <p>${cryptoDetails.market_data?.current_price?.usd}</p>
          </div>
        </div>
        <div className="details-box">
          <h2 style={{ fontWeight: 'bold', color: '#ba25e8' }}>MARKET CAP</h2>
          <div className="details">
            <p>${cryptoDetails.market_data?.market_cap?.usd}</p>
          </div>
        </div>
        <div className="details-box">
          <h2 style={{ fontWeight: 'bold', color: '#ba25e8' }}>24H VOLUME</h2>
          <div className="details">
            <p>${cryptoDetails.market_data?.total_volume?.usd}</p>
          </div>
        </div>
      </div>
      <div className="time-granularity">
        <p style={{ fontWeight: 'bold' }}>TIME FRAME</p>
        <select id="timeGranularity" value={timeGranularity} onChange={handleTimeGranularityChange}>
          <option value="hourly">HOURLY</option>
          <option value="daily">DAILY</option>
          <option value="weekly">WEEKLY</option>
        </select>
      </div>
      <div className="crypto-dropdown">
        <p style={{ fontWeight: 'bold' }}>SELECT CRYPTOCURRENCY</p>
        <select id="cryptoDropdown" value={selectedCrypto} onChange={handleCryptoChange}>
          <option value="">SELECT</option>
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>{crypto.name.toUpperCase()}</option>
          ))}
        </select>
      </div>
      <div className="chart-container">
        <canvas id="historicalChart"></canvas>
      </div>
    </div>
  );
}

export default Visual;
