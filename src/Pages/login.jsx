import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import './CSS/Login.css';

const Login = ({ setAccountVerified }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleVerifyAccount = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/verifyuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            if (response.ok) {
                setAccountVerified(true);
                navigate('/search'); // Navigate to the search page on successful login
            } else {
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    return (
        <div className='login'>
            <div className="login-container">
                <h1>Login</h1>
                <div className="login-fields">
                    <input
                        type="text"
                        placeholder='Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleVerifyAccount}>Login</button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <p className='login-signup'>
                    Don't have an account? <Link to="/signup"><span>Sign up here</span></Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
