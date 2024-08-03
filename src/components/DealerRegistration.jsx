import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DealerRegistration.module.css';

function DealerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    age: '',
    address: '',
    locationLink: '',
    shopName: '',
    shopGST: ''
  });
  const [stage, setStage] = useState(1); // 1: Data entry, 2: OTP verification
  const [error, setError] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValidGSTIN = (gst) => {
    const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return pattern.test(gst);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      console.error('Password is required');
      return; // Prevent the form submission if password is missing
    }
    if (!isValidGSTIN(formData.shopGST)) {
      setError('Invalid GST number format');
      return;
    }
    if (stage === 1) {
      try {
        const response = await fetch(`https://local-treasures.onrender.com/dealer/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Failed to register dealer');
        setStage(2); // Move to OTP verification stage
      } catch (error) {
        console.error('Error registering dealer:', error);
        setError('Failed to register dealer. Please check your input.');
      }
    } else {
      verifyOtp();
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`https://local-treasures.onrender.com/dealer/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });
      if (!response.ok) {
        throw new Error('OTP verification failed');
      }
      const data = await response.json();
      console.log(data.message); // Assuming a success message is returned
      navigate('/dealersignin');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData((prevState) => ({ ...prevState, locationLink }));
        },
        (error) => {
          console.error('Error getting user location:', error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Dealer Registration</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        {stage === 1 && (
          <>
            <div className={styles.template}>
              <h3>Personal Details</h3>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone No:</label>
                <input type="tel" id="phone" name="phone" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" required onChange={handleInputChange} />
              </div>
            </div>

            <div className={styles.template}>
              <h3>Location</h3>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <span id="user-location">
                  {formData.locationLink ? (
                    <a href={formData.locationLink} target="_blank" rel="noopener noreferrer">
                      View your location
                    </a>
                  ) : (
                    'Fetching user location...'
                  )}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" required onChange={handleInputChange} />
              </div>
              <input type="hidden" id="location-link" name="locationLink" value={formData.locationLink} />
              <div className="form-group">
                <label htmlFor="shopName">Shop Name:</label>
                <input type="text" id="shopName" name="shopName" required onChange={handleInputChange} />
              </div>
            </div>

            <div className={styles.template}>
              <h3>Details of the Shop</h3>
              <div className="form-group">
                <label htmlFor="shopGST">Shop GST No:</label>
                <input type="text" id="shopGST" name="shopGST" onChange={handleInputChange} />
              </div>
            </div>
            <button type="submit">Send OTP</button>
          </>
        )}
        {stage === 2 && (
          <div className={styles.template}>
            <h3>Enter OTP</h3>
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <input type="text" id="otp" name="otp" required onChange={handleInputChange} />
            </div>
            <button type="submit">Verify OTP</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default DealerRegistration;
