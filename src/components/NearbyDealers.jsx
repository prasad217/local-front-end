import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            const response = await fetch(`/api/dealers/nearby?latitude=${latitude}&longitude=${longitude}`);
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
        <div>
            {locationError && <p>{locationError}</p>}
            <ul>
                {dealers.map(dealer => (
                    <li key={dealer.id}>
                        <strong>
                            <Link to={`/dealers/${dealer.id}/products`}>{dealer.shop_name}</Link>
                        </strong><br />
                        Name: {dealer.name}<br />
                        Phone: {dealer.phone}<br />
                        Email: {dealer.email}<br />
                        Address: {dealer.address}<br />
                        <a href={dealer.location_link} target="_blank" rel="noopener noreferrer">View on Map</a>
                        <p>{dealer.distance ? `${dealer.distance.toFixed(2)} km away` : ''}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NearbyDealers;
