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
    try {
      // Updated fetch request with credentials: 'include'
      const response = await fetch('http://localhost:3001/dealer/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures cookies are sent with the request
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to sign in');
      console.log('Dealer signed in successfully');
      navigate('/dealerhome'); // Redirect to Dealer Home after successful sign-in
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
