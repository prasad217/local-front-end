import React, { useState, useEffect } from 'react';

function DealerRegistration() {
    const [registrationForm, setRegistrationForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        age: '',
        address: '',
        locationLink: '',
        shopName: ''
    });
    const [otp, setOtp] = useState('');
    const [emailForOtp, setEmailForOtp] = useState('');

    useEffect(() => {
        getLocation();
    }, []);

    const handleInputChange = (e) => {
        setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/dealer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationForm),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                setEmailForOtp(registrationForm.email);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/dealer/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailForOtp, otp }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const locationLink = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
                    setRegistrationForm(prevState => ({
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
        <div className="container">
            <h2>Dealer Registration</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={registrationForm.name} onChange={handleInputChange} />
                <input type="tel" name="phone" placeholder="Phone" value={registrationForm.phone} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={registrationForm.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={registrationForm.password} onChange={handleInputChange} />
                <input type="number" name="age" placeholder="Age" value={registrationForm.age} onChange={handleInputChange} />
                <input type="text" name="address" placeholder="Address" value={registrationForm.address} onChange={handleInputChange} />
                <label htmlFor="location">Location:</label>
                <span id="user-location">
                    {registrationForm.locationLink ? (
                        <a href={registrationForm.locationLink} target="_blank" rel="noopener noreferrer">View your location</a>
                    ) : (
                        'Fetching user location...'
                    )}
                </span>
                <input type="text" name="shopName" placeholder="Shop Name" value={registrationForm.shopName} onChange={handleInputChange} />
                <button type="submit">Register</button>
            </form>
            {emailForOtp && (
                <>
                   <h2>Verify OTP</h2>
                    <form onSubmit={verifyOtp}>
                        <label htmlFor="otpInput">OTP:</label> {/* Ensure this label is correctly associated */}
                        <input
                            type="text"
                            id="otpInput" // This id matches the htmlFor of the label
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                        />
                        <button type="submit">Verify OTP</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default DealerRegistration;

