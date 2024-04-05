import React, { useState, useEffect } from 'react';

function DealerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    age: '',
    address: '',
    locationLink: '',
    shopName: ''
  });

  useEffect(() => {
    getLocation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have an endpoint `/api/dealer/register` to handle the post request
    try {
      const response = await fetch(`http://localhost:3001/dealer/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to register');
      // Handle success
      console.log('Dealer registered successfully');
    } catch (error) {
      console.error('Error registering dealer:', error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData(prevState => ({
            ...prevState,
            locationLink
          }));
        },
        (error) => {
          console.error('Error getting user location:', error);
        },
        { enableHighAccuracy: true } // Request high accuracy for better location results
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container">
      <h2>Dealer Registration</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="shopName">Shop Name:</label>
          <input type="text" id="shopName" name="shopName" required onChange={handleInputChange} />
        </div>
  
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DealerRegistration;
