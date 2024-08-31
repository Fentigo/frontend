import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/exchanges_table.css';

const ExchangeTable = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);  // State for refreshing
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');         // To store the city input
    const [country, setCountry] = useState('');   // To store the country input

    // Fetch exchange data based on city and country
    const fetchExchangeData = async () => {
        setLoading(true); // Start loading
        setError(null);   // Clear any previous errors

        // Construct the query string
        let query = '';
        if (city) query += `city=${city}`;
        if (country) query += `${query ? '&' : ''}country=${country}`;

        // Check if query exists, if not, don't append "?"
        const url = query ? `http://127.0.0.1:8000/api/exchanges/?${query}` : 'http://127.0.0.1:8000/api/exchanges/';

        try {
            const response = await axios.get(url);
            setExchanges(response.data);
            console.log('Exchange API Response:', response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    // Function to refresh the exchange database
    const refreshDatabase = async () => {
        setRefreshing(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/refresh-exchanges/');
            if (response.status === 200) {
                alert('Exchange database refreshed successfully!');
                fetchExchangeData();  // Optionally, fetch the data after refreshing
            }
        } catch (err) {
            setError(err);
            alert('Failed to refresh the database. Please try again.');
        } finally {
            setRefreshing(false);
        }
    };

    // Render the UI
    return (
        <div>
            <h2>Fetch Exchange Data</h2>

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
            <button onClick={fetchExchangeData} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Data"}
            </button>

            {/* Button to refresh the exchange database */}
            <button onClick={refreshDatabase} disabled={refreshing}>
                {refreshing ? "Refreshing..." : "Refresh Database"}
            </button>

            {/* Show error if there's any */}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

            {/* Show loading message */}
            {loading && <p>Loading data...</p>}

            {/* Display the table only if data is available */}
            {exchanges.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Fac Count</th>
                            <th>Net Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchanges.map((exchange, index) => (
                            <tr key={index}>
                                <td>{exchange.name}</td>
                                <td>{exchange.city}</td>
                                <td>{exchange.country}</td>
                                <td>{exchange.fac_count}</td>
                                <td>{exchange.net_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExchangeTable;

