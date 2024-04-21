import React, { useState, useEffect } from 'react';
import styles from './DealerRegistration.module.css';

function DealerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    age: '',
    address: '',
    locationLink: '',
    shopName: '',
    shopGST: '',
    shopPhoto: null,
    storeType: '',
    otp: ''
  });
  const [stage, setStage] = useState(1);  // 1: Data entry, 2: OTP verification

  useEffect(() => {
    getLocation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;
    setFormData(prevState => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stage === 1) {
      const formDataToSend = new FormData();
      Object.entries(formData).filter(([key]) => key !== 'otp').forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      try {
        const response = await fetch('http://localhost:3001/dealer/send-otp', {
          method: 'POST',
          body: formDataToSend,
        });
        if (!response.ok) throw new Error('Failed to send OTP');
        setStage(2);  // Move to OTP verification stage
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    } else {
      verifyOtp();
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:3001/dealer/verify-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      if (!response.ok) throw new Error('OTP verification failed');
      console.log('Dealer registered successfully');
      // Optionally reset form or redirect user
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
          setFormData(prevState => ({ ...prevState, locationLink }));
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
                    <a href={formData.locationLink} target="_blank" rel="noopener noreferrer">View your location</a>
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
                <label htmlFor="shopName">Shop Name:</label
                <input type="text" id="shopName" name="shopName" required onChange={handleInputChange} />
              </div>
            </div>

            <div className={styles.template}>
              <h3>Details of the Shop</h3>
              <div className="form-group">
                <label htmlFor="shopGST">Shop GST No:</label>
                <input type="text" id="shopGST" name="shopGST" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="shopPhoto">Shop License:</label>
                <input type="file" id="shopPhoto" name="shopPhoto" accept="image/*" onChange={handleInputChange} />
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
