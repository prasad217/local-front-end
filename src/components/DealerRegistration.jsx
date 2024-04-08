import React, { useState } from 'react';

function DealerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    age: '',
    address: '',
    shopName: '',
    otp: '',
  });
  const [step, setStep] = useState(1); // Control the step of the registration process
  const [otpSent, setOtpSent] = useState(false); // Flag to indicate if the OTP has been sent

  // Handles changes to form inputs and updates the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles the generation of OTP
  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    // Placeholder for the OTP generation request
    console.log('Requesting OTP for email:', formData.email);
    // Simulate OTP generation
    setOtpSent(true);
    setStep(2); // Proceed to OTP verification step
  };

  // Verifies the OTP entered by the user
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    // Placeholder for the OTP verification request
    console.log('Verifying OTP:', formData.otp);
    // Simulate OTP verification
    setStep(3); // Proceed to complete the registration form
  };

  // Submits the registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting registration form:', formData);
    // Placeholder for form submission request
    // Reset form or handle registration logic here
  };

  // Step 1: Enter Email & Generate OTP
  if (step === 1) {
    return (
      <div className="container">
        <h2>Dealer Registration - Verify Email</h2>
        <form onSubmit={handleGenerateOTP}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Generate OTP</button>
        </form>
        {otpSent && <p>Check your email for the OTP.</p>}
      </div>
    );
  }

  // Step 2: Verify OTP
  if (step === 2) {
    return (
      <div className="container">
        <h2>Dealer Registration - Enter OTP</h2>
        <form onSubmit={handleVerifyOTP}>
          <div>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    );
  }

  // Step 3: Complete Registration
  if (step === 3) {
    return (
      <div className="container">
        <h2>Dealer Registration - Complete Registration</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone No:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email (readonly):</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              readOnly
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="shopName">Shop Name:</label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default DealerRegistration;
