import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchExchanges = () => {
    const query = `?city=${city}&country=${country}`;
    axios.get(`http://localhost:8000/api/exchanges/${query}`)
      .then(response => {
        setExchanges(response.data);
      })
      .catch(error => {
        console.error('Error fetching exchange data:', error);
      });
  };

  const refreshData = () => {
    setIsRefreshing(true);
    axios.get('http://localhost:8000/api/refresh-data/')
      .then(response => {
        alert('Data refreshed successfully!');
        setIsRefreshing(false);
        fetchExchanges();
      })
      .catch(error => {
        console.error('Error refreshing data:', error);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchExchanges();
  }, [city, country]);

  return (
    <div>
      <h2>Exchanges</h2>
      <input
        type="text"
        placeholder="Filter by City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={fetchExchanges}>Fetch Data</button>

      <button onClick={refreshData} disabled={isRefreshing}>
        {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
      </button>

      <ul>
        {exchanges.map(exchange => (
          <li key={exchange.name}>
            {exchange.name} - {exchange.city}, {exchange.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exchange;
