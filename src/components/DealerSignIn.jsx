import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Signin.module.css';  

function DealerSignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });
  const [needOTP, setNeedOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = needOTP ? `https://local-treasures.onrender.com/dealer/verify-otp` : `https://local-treasures.onrender.com/dealer/signin`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to sign in');
        if (data.resendOTP) {
          setNeedOTP(true); // Ensure OTP input is shown
        }
        return; // Exit the function if there is an error
      }

      console.log(data.message); // Log the successful message
      navigate('/dealerhome'); // Redirect after success
    } catch (error) {
      console.error('Error signing in dealer:', error);
      setErrorMessage('Network error or server is not responding.');
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Local Treasures</h1>
      <div className={styles.container}>
        <h2 className={styles.subHeader}>Dealer Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={`${styles.label} ${errorMessage ? styles.errorLabel : ''}`}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="password" className={`${styles.label} ${errorMessage ? styles.errorLabel : ''}`}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          {needOTP && (
            <div>
              <label htmlFor="otp" className={`${styles.label} ${errorMessage ? styles.errorLabel : ''}`}>OTP:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                required
                value={formData.otp}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton}>{needOTP ? 'Verify OTP' : 'Sign In'}</button>
        </form>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {!needOTP && (
          <div className={styles.link}>
            <p>Don't have an account? <Link to="/dealer/register">Register</Link></p>
          </div>
        )}
      </div>
      <p className={styles.footer}>© 2024 Local Treasures. All rights reserved.</p>
    </div>
  );
}

export default DealerSignIn;
