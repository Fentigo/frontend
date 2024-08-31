import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/network.css';

const NetworkTable = () => {
    const [networks, setNetworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);  // State for refreshing
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');         // To store the city input
    const [country, setCountry] = useState('');   // To store the country input

    // Fetch network data based on city and country
    const fetchNetworkData = async () => {
        setLoading(true); // Start loading
        setError(null);   // Clear any previous errors

        // Construct the query string
        let query = '';
        if (city) query += `city=${city}`;
        if (country) query += `${query ? '&' : ''}country=${country}`;

        // Check if query exists, if not, don't append "?"
        const url = query ? `http://127.0.0.1:8000/api/networks/?${query}` : 'http://127.0.0.1:8000/api/networks/';

        try {
            const response = await axios.get(url);
            console.log('Network API Response:', response.data);
            setNetworks(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError(err);
            console.error('Error fetching network data:', err);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    // Function to refresh the network database
    const refreshDatabase = async () => {
        setRefreshing(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/refresh-networks/');
            if (response.status === 200) {
                alert('Network database refreshed successfully!');
                fetchNetworkData();  // Optionally, fetch the data after refreshing
            }
        } catch (err) {
            setError(err);
            alert('Failed to refresh the database. Please try again.');
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <div>
            <h2>Fetch Network Data</h2>

            {/* Input fields for city and country */}
            <div>
                <label>
                    City:
                    <input 
                        type="text" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                        placeholder="Enter city" 
                    />
                </label>
                <br />
                <label>
                    Country:
                    <input 
                        type="text" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        placeholder="Enter country" 
                    />
                </label>
            </div>

            {/* Button to fetch data */}
            <button onClick={fetchNetworkData} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Data"}
            </button>

            {/* Button to refresh the network database */}
            <button onClick={refreshDatabase} disabled={refreshing}>
                {refreshing ? "Refreshing..." : "Refresh Database"}
            </button>

            {/* Show error if there's any */}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

            {/* Show loading message */}
            {loading && <p>Loading data...</p>}

            {/* Display the table only if data is available */}
            {networks.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>AS Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {networks.map((network, index) => (
                            <tr key={index}>
                                <td>{network.name || 'N/A'}</td>
                                <td>{network.asn || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NetworkTable;

