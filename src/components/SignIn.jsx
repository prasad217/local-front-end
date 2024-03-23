import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Necessary for cookies to be sent with requests
        body: JSON.stringify({ email, password })
      });

      const data = await response.json(); // Parse JSON response
      if (response.ok) {
        console.log('Sign-in successful', data);
        window.location.href = '/'; // Redirect on successful sign-in
      } else {
        console.error('Sign-in failed', data.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>Not a user? <a href="/register">Register now</a></p>
      <p>Dealer? <a href="/dealersignin">Sign in now</a></p>
      <p>Are you a delivery agent? <a href="/delivery-agent-signin">Sign in here</a>.</p>
    </div>
  );
}

export default SignIn;
