import React, { useState } from 'react';
import ExchangeTable from './exchanges_table';
import NetworkTable from './network_table';
import FacilityTable from './FacilityTable';

const ProtectedComponent = () => {
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const correctPassword = "jordanisking"; // Replace with your actual password

    // Function to handle password verification
    const handlePasswordSubmit = (e) => {
        e.preventDefault(); // Prevent form submission

        if (enteredPassword === correctPassword) {
            setIsPasswordVerified(true);
            setErrorMessage(''); // Clear any previous error messages
        } else {
            setErrorMessage('Incorrect password. Please try again.');
            setEnteredPassword(''); // Clear the password input field
        }
    };

    // If the password is not verified, render the password input field
    if (!isPasswordVerified) {
        return (
            <div>
                <h2>Please Enter Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <button type="submit">Submit</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        );
    }

    // Once the password is verified, render the protected content
    return (
        <div>
            <h2>Protected Content</h2>
            <ExchangeTable />
            <NetworkTable />
            <FacilityTable />
        </div>
    );
};

export default ProtectedComponent;


