import React, { useState, useEffect } from 'react';
import styles from './DealerRegistration.module.css'; // Import CSS module

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
    openDays: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    },
    openingTime: '',
    closingTime: ''
  });

  useEffect(() => {
    getLocation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);

    const newValue = type === 'file' ? e.target.files[0] : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };
  

  const handleDayChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      openDays: {
        ...prevState.openDays,
        [name]: checked
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have an endpoint /api/dealer/register to handle the post request
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const response = await fetch('http://localhost:3001/dealer/register', {
        method: 'POST',
        body: formDataToSend
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
          <div className="form-group">
            <label htmlFor="shopPhoto">Shop Photo:</label>
            <input type="file" id="shopPhoto" name="shopPhoto" accept="image/*" onChange={handleInputChange} />
          </div>
        </div>

        <div className={styles.template}>
          <h3>Shop Opening Times</h3>
          <div className={styles.openingTime}>
            {Object.keys(formData.openDays).map(day => (
              <div key={day}>
                <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                <input
                  type="checkbox"
                  id={day}
                  name={day}
                  checked={formData.openDays[day]}
                  onChange={handleDayChange}
                />
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="openingTime">Opening Time:</label>
            <input type="time" id="openingTime" name="openingTime" required onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="closingTime">Closing Time:</label>
            <input type="time" id="closingTime" name="closingTime" required onChange={handleInputChange} />
          </div>
        </div>
  
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DealerRegistration;