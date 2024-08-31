import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/facilities.css'
const FacilityTable = () => {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');         // To store the city input
    const [country, setCountry] = useState('');   // To store the country input

    // Fetch facility data based on city and country
    const fetchFacilityData = async () => {
        setLoading(true); // Start loading
        setError(null);   // Clear any previous errors

        // Construct the query string
        let query = '';
        if (city) query += `city=${city}`;
        if (country) query += `${query ? '&' : ''}country=${country}`;

        // Construct the API URL with or without query parameters
        const url = query ? `http://127.0.0.1:8000/api/facility/?${query}` : 'http://127.0.0.1:8000/api/facility/';

        try {
            const response = await axios.get(url);
            console.log('Facility API Response:', response.data); // Log the data to the console
            setFacilities(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError(err);
            console.error('Error fetching facility data:', err);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div>
            <h2>Fetch Facility Data</h2>

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
            <button onClick={fetchFacilityData} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Data"}
            </button>

            {/* Show error if there's any */}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

            {/* Show loading message */}
            {loading && <p>Loading data...</p>}

            {/* Display the raw JSON response */}
            <pre>{JSON.stringify(facilities, null, 2)}</pre>

            {/* Display the table only if data is available */}
            {facilities.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Organization</th>
                            <th>City</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Country</th>
                            <th>Net Count</th>
                            <th>Exchange Count</th>

                            <th>Address1</th>
                            <th>Address2</th>
                            <th>Zipcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facilities.map((facility, index) => (
                            <tr key={index}>
                                <td>{facility.org_name || 'N/A'}</td>
                                <td>{facility.city || 'N/A'}</td>
                                <td>{facility.latitude || 'N/A'}</td>
                                <td>{facility.longitude || 'N/A'}</td>
                                <td>{facility.country || 'N/A'}</td>
                                <td>{facility.net_count || 'N/A'}</td>
                                <td>{facility.ix_count || 'N/A'}</td>
                                <td>{facility.address1 || 'N/A'}</td>
                                <td>{facility.address2 || 'N/A'}</td>
                                <td>{facility.zipcode || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FacilityTable;
