import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import './MarketDepthAnalysis.css'

const MarketDepthAnalysis = () => {
  const [coinId, setCoinId] = useState("bitcoin");
  const [intervalDays, setIntervalDays] = useState(1);
  const [topCoins, setTopCoins] = useState([]);
  const [marketChartData, setMarketChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false');
        if (!response.ok) {
          throw new Error('Failed to fetch top coins');
        }
        const data = await response.json();
        setTopCoins(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchTopCoins();
  }, []);

  useEffect(() => {
    console.log("Fetching data for coinId:", coinId);

    const fetchMarketChartData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${intervalDays}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched market chart data:', data);

        // Extract timestamps and prices
        const timestamps = data.prices.map(price => new Date(price[0]));
        const prices = data.prices.map(price => price[1]);

        setMarketChartData({ timestamps, prices });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMarketChartData();
  }, [coinId, intervalDays]);

  const handleCoinChange = (event) => {
    setCoinId(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setIntervalDays(parseInt(event.target.value));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Define chartOptions based on intervalDays
  let chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Market Depth Analysis for ${coinId}`,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {},
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 1,
      },
    },
  };

  // Adjust displayFormats based on intervalDays
  if (intervalDays === 1) {
    chartOptions.scales.x.time.unit = 'hour';
    chartOptions.scales.x.time.displayFormats = {
      hour: 'HH:mm', // Display timestamp for 1-day interval
    };
  } else {
    chartOptions.scales.x.time.unit = 'day';
    chartOptions.scales.x.time.displayFormats = {
      day: 'MMM d, yyyy', // Format for displaying dates on the x-axis
    };
  }

  const chartData = {
    labels: marketChartData.timestamps,
    datasets: [
      {
        label: 'Price',
        data: marketChartData.prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <div className="market-depth-container">
      <h2>Market Depth Analysis</h2>
      <div className="select-container">
        <label htmlFor="coinSelect">COIN:</label>
        <select id="coinSelect" value={coinId} onChange={handleCoinChange} className="crypto-dropdown">
          {topCoins.map((coin) => (
            <option key={coin.id} value={coin.id}>{coin.name.toUpperCase()}</option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <label htmlFor="intervalSelect">TIME INTERVAL:</label>
        <select id="intervalSelect" value={intervalDays} onChange={handleIntervalChange} className="time-granularity">
          <option value={1}>1 day</option>
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
          <option value={60}>60 days</option>
          <option value={90}>90 days</option>
          <option value={180}>180 days</option>
          <option value={365}>365 days</option>
        </select>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MarketDepthAnalysis;
