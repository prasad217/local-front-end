import React, { useState, useEffect } from 'react';
import styles from './NearbyDealers.module.css';

const NearbyDealers = () => {
  const [dealers, setDealers] = useState([]);
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      fetchNearbyDealers(latitude, longitude);
    };

    const error = () => {
      setLocationError('Unable to retrieve your location. Please ensure location services are enabled and try again.');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchNearbyDealers = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://local-treasures.onrender.com/api/dealers/nearby?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDealers(data);
    } catch (error) {
      console.error('Error fetching nearby dealers:', error);
      setLocationError('Error fetching nearby dealers. Please try again later.');
    }
  };

  return (
    <div className={styles.dealersContainer}>
      {locationError && <p>{locationError}</p>}
      <div className={styles.dealersList}>
        {dealers.map(dealer => (
          <div key={dealer.id} className={styles.dealerItem} onClick={() => navigateToDealerProducts(dealer.id)}>
            <div className={styles.dealerContent}>
              <strong>{dealer.shop_name}</strong><br />
              Name: {dealer.name}<br />
              Phone: {dealer.phone}<br />
              Email: {dealer.email}<br />
              Address: {dealer.address}<br />
              <a href={dealer.location_link} target="_blank" rel="noopener noreferrer">View on Map</a>
              <p>{dealer.distance ? `${dealer.distance.toFixed(2)} km away` : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const navigateToDealerProducts = (dealerId) => {
  // Navigate to dealer products page when clicking on a dealer item
  window.location.href = `/dealers/${dealerId}/products`;
};

export default NearbyDealers;
