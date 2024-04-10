import React, { useState } from 'react';
import styles from './DeliveryRegistration.module.css';

function DeliveryRegistration() {
    const [registrationForm, setRegistrationForm] = useState({
        name: '',
        phone: '',
        dob: '',
        email: '',
        address: '',
        vehicle_number: '',
        password: ''
      });
      const [otp, setOtp] = useState('');
      const [emailForOtp, setEmailForOtp] = useState('');
    
      // Handle form changes
      const handleRegistrationChange = (e) => {
        setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value });
      };
    
      // Handle registration submission
      const handleRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/delivery-agent/register', {
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
    
      // Handle OTP input change
      const handleOtpChange = (e) => {
        setOtp(e.target.value);
      };
    
      // Verify OTP
      const verifyOtp = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/delivery-agent/verify-otp', {
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
  return (
    <div className="container">
    <h2 className="registration-heading">Delivery Agent Registration</h2>
    <form className="registration-form" onSubmit={handleRegister}>
      <input type="text" className="input-field" name="name" placeholder="Name" value={registrationForm.name} onChange={handleRegistrationChange} />
      <input type="text" className="input-field" name="phone" placeholder="Phone" value={registrationForm.phone} onChange={handleRegistrationChange} />
      <input type="date" className="input-field" name="dob" placeholder="Date of Birth" value={registrationForm.dob} onChange={handleRegistrationChange} />
      <input type="email" className="input-field" name="email" placeholder="Email" value={registrationForm.email} onChange={handleRegistrationChange} />
      <input type="text" className="input-field" name="address" placeholder="Address" value={registrationForm.address} onChange={handleRegistrationChange} />
      <input type="text" className="input-field" name="vehicle_number" placeholder="Vehicle Number" value={registrationForm.vehicle_number} onChange={handleRegistrationChange} />
      <input type="password" className="input-field" name="password" placeholder="Password" value={registrationForm.password} onChange={handleRegistrationChange} />
      <button type="submit" className="submit-button">Register</button>
    </form>
    {emailForOtp && (
      <div className="otp-section">
        <h2 className="otp-heading">Verify OTP</h2>
        <form className="otp-form" onSubmit={verifyOtp}>
          <input type="text" className="otp-input" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} />
          <button type="submit" className="otp-submit-button">Verify OTP</button>
        </form>
      </div>
    )}
  </div>
  );
}

export default DeliveryRegistration;
