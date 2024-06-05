import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Watchlist from './Watchlist';

function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_457224c61b002cd1f6be4e4cf1e0045b86006&q=cryptocurrency&language=en');
        const data = await response.json();
        setNews(data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="news-section">
      <h2>Cryptocurrency News</h2>
      <div className="news-container">
        {news.map((article, index) => (
          <div key={index} className="news-article">
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function MainPage() {
  return (
    <div className="main-page">
      <section className="intro-section">
        <h2>Welcome to the Cryptocurrency Analytics Platform</h2>
        <p>Get real-time data, historical charts, and manage your watchlist with our comprehensive platform.</p>
      </section>
      <section className="info-section">
        <div className="info-container">
          <h3>Real-Time Data</h3>
          <p>Access up-to-date data on various cryptocurrencies including prices, market cap, and volume.</p>
        </div>
        <div className="info-container">
          <h3>Interactive Charts</h3>
          <p>Visualize market trends and historical data with our interactive charts.</p>
        </div>
        <div className="info-container">
          <h3>Watchlist Management</h3>
          <p>Track your favorite cryptocurrencies and manage your personal watchlist.</p>
        </div>
      </section>
      <NewsSection />
      <section className="additional-info">
        <h2>Stay Informed</h2>
        <p>Join our community to receive the latest updates and insights on the cryptocurrency market.</p>
      </section>
    </div>
  );
}

export default MainPage;
