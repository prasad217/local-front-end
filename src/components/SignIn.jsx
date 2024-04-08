import React, { useState } from 'react';
import styles from './Signin.module.css'; 


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
    <div>
      <h1 className={styles.header}>Local Treasures</h1> {/* Moved the heading outside the container */}
      <div className={styles.containe}>
        <h2 className={styles.subHeader}>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
          </div>
          <button type="submit" className={styles.submitButton}>Sign In</button>
        </form>
        <p className={styles.link}>Not a user? <a href="/register">Register now</a></p>
        <p className={styles.link}>Dealer? <a href="/dealersignin">Sign in now</a></p>
        <p className={styles.link}>Are you a delivery agent? <a href="/delivery-agent/signin">Sign in here</a>.</p>
      </div>
    </div>
  );
}

export default SignIn;