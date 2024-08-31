import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to fetch data from the backend
  const fetchFacilities = () => {
    const query = `?city=${city}&country=${country}`;
    axios.get(`http://localhost:8000/api/facilities/${query}`)
      .then(response => {
        setFacilities(response.data);
      })
      .catch(error => {
        console.error('Error fetching facility data:', error);
      });
  };

  // Function to refresh data by calling the refresh endpoint
  const refreshData = () => {
    setIsRefreshing(true);
    axios.get('http://localhost:8000/api/refresh-data/')
      .then(response => {
        alert('Data refreshed successfully!');
        setIsRefreshing(false);
        fetchFacilities();  // Optionally re-fetch data after refresh
      })
      .catch(error => {
        console.error('Error refreshing data:', error);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchFacilities();
  }, [city, country]);

  return (
    <div>
      <h2>Facilities</h2>
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
      <button onClick={fetchFacilities}>Fetch Data</button>

      <button onClick={refreshData} disabled={isRefreshing}>
        {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
      </button>

      <ul>
        {facilities.map(facility => (
          <li key={facility.name}>
            {facility.name} - {facility.city}, {facility.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Facility;
