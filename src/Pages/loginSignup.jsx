// Frontend code with modified create account functionality
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setAccountCreated(true);
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        {!accountCreated ? (
          <>
            <h1>Sign up</h1>
            <div className="loginsignup-fields">
              <input id="name" type="text" placeholder='Your Name' />
              <input id="email" type="email" placeholder='Email Address' />
              <input id="password" type="password" placeholder='Password' />
            </div>
            <button onClick={handleCreateAccount}>Create an account</button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <p className='loginsignup-login'>
              Already have an account? <Link to="/"><span>Login here</span></Link>
            </p>
            <div className="loginsignup-agree">
              {/* <input type="checkbox" /> */}
              <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
          </>
        ) : (
          <div className="account-created">
            <h2>Account Created!</h2>
            <p>Your account has been created. You can now <Link to="/"><span>login here</span></Link> using your username and password.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
