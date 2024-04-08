import React, { useState } from 'react';

function DeliveryAgentSignIn() {
    const [signInForm, setSignInForm] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/delivery-agent/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signInForm),
        })
        .then(response => response.json())
        .then(data => {
          if (data.agentName) {
            alert(`Welcome back, ${data.agentName}`);
            // Redirect the agent to their dashboard or home page
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Sign-in failed. Please try again.');
        });
    };

    return (
        <div>
            <h2>Delivery Agent Sign-In</h2>
            <form onSubmit={handleSignIn}>
                <input type="email" name="email" placeholder="Email" value={signInForm.email} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={signInForm.password} onChange={handleInputChange} />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default DeliveryAgentSignIn;
