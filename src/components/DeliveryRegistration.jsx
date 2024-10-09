import React, { useState } from 'react';
import styles from './DeliveryRegistration.module.css';

function DeliveryRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
    email: '',
    address: '',
    vehicle_number: '',
    password: ''
  });
  const [stage, setStage] = useState(1); // 1: Data entry, 2: OTP verification
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password) {
      console.error('Password is required');
      return; // Prevent the form submission if password is missing
    }
    if (stage === 1) {
      try {
        const response = await fetch(`http://localhost:31340/delivery-agent/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Failed to register delivery agent');
        setStage(2); // Move to OTP verification stage
      } catch (error) {
        console.error('Error registering delivery agent:', error);
        setError('Failed to register delivery agent. Please check your input.');
      }
    } else {
      verifyOtp();
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`http://localhost:31340/delivery-agent/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });
      if (!response.ok) {
        throw new Error('OTP verification failed');
      }
      const data = await response.json();
      console.log(data.message); // Assuming a success message is returned
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Delivery Agent Registration</h2>
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
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" required onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="vehicle_number">Vehicle Number:</label>
                <input type="text" id="vehicle_number" name="vehicle_number" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={handleInputChange} />
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

export default DeliveryRegistration;
