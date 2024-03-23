import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DealerSignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate instead of useHistory

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have an endpoint `/api/dealer/signin` to handle the post request
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/dealer/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to sign in');
      // Handle success
      console.log('Dealer signed in successfully');
      // Redirect to Dealer Home after successful sign-in
      navigate('/dealerhome');
    } catch (error) {
      console.error('Error signing in dealer:', error);
    }
  };

  return (
    <div className="container">
      <h2>Dealer Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div>
        <p>Don't have an account? <Link to="/dealer/register">Register</Link></p>
      </div>
    </div>
  );
}

export default DealerSignIn;
