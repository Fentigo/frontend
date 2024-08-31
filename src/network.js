import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Network = () => {
  const [networks, setNetworks] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNetworks = () => {
    const query = `?city=${city}&country=${country}`;
    axios.get(`http://localhost:8000/api/networks/${query}`)
      .then(response => {
        setNetworks(response.data);
      })
      .catch(error => {
        console.error('Error fetching network data:', error);
      });
  };

  const refreshData = () => {
    setIsRefreshing(true);
    axios.get('http://localhost:8000/api/refresh-data/')
      .then(response => {
        alert('Data refreshed successfully!');
        setIsRefreshing(false);
        fetchNetworks();
      })
      .catch(error => {
        console.error('Error refreshing data:', error);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchNetworks();
  }, [city, country]);

  return (
    <div>
      <h2>Networks</h2>
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
      <button onClick={fetchNetworks}>Fetch Data</button>

      <button onClick={refreshData} disabled={isRefreshing}>
        {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
      </button>

      <ul>
        {networks.map(network => (
          <li key={network.name}>
            {network.name} - {network.city}, {network.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Network;
