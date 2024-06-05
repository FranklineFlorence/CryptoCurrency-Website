import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CryptoConverter.css';

const CryptoConverter = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [fiatCurrencies, setFiatCurrencies] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
        const data = response.data;
        setCryptoList(data);
      } catch (error) {
        console.error('Error fetching crypto list:', error);
      }
    };

    const fetchFiatCurrencies = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
        const fiatCurrencies = response.data.filter(currency => !cryptoList.find(crypto => crypto.symbol === currency));
        setFiatCurrencies(fiatCurrencies);
      } catch (error) {
        console.error('Error fetching fiat currencies:', error);
      }
    };

    fetchCryptoList();
    fetchFiatCurrencies();
  }, []);

  const handleConversion = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=${selectedCurrency}`);
      const price = response.data[selectedCrypto][selectedCurrency];
      setResult(price * amount);
    } catch (error) {
      console.error('Error fetching conversion:', error);
    }
  };

  return (
    <div className="crypto-converter">
      <h2>Crypto Converter</h2>
      <div className="converter-inputs">
        <div className="input-group">
          <label htmlFor="crypto">CRYPTO:</label>
          <select id="crypto" value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
            <option value="">SELECT</option>
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>{crypto.name.toUpperCase()}</option>
            ))}
          </select>
          {selectedCrypto && <img src={cryptoList.find(crypto => crypto.id === selectedCrypto)?.image} alt="Crypto Logo" className="crypto-logo" />}
        </div>
        <div className="input-group">
          <label htmlFor="currency">CURRENCY:</label>
          <select id="currency" value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
            <option value="">SELECT</option>
            {fiatCurrencies.map((currency) => (
              <option key={currency} value={currency}>{currency.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="amount">AMOUNT:</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
        </div>
        <button onClick={handleConversion}>Convert</button>
      </div>
      {result !== 0 && (
        <div className="conversion-result">
          <div className="result-display">
            <h2>Conversion Result</h2>
            <p>{amount} {selectedCrypto.toUpperCase()} is equal to {result} {selectedCurrency.toUpperCase()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoConverter;
