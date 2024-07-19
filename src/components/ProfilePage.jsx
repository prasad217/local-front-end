import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));

    fetch(`${process.env.REACT_APP_API_URL}/api/user/suggestions`, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setSuggestions(data))
      .catch(error => console.error('Error fetching suggestions:', error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {user.username}</h1>
      <div className="contact-details">
        <h2>Contact Details</h2>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="buttons">
        <button onClick={() => window.location.href='/orders'}>Previous Orders</button>
        <button onClick={() => window.location.href='/address'}>Address</button>
      </div>
      <div className="suggestions">
        <h2>Suggestions for You</h2>
        {suggestions.length > 0 ? (
          <div className="suggestions-list">
            {suggestions.map(suggestion => (
              <a key={suggestion.id} href={`/products/${suggestion.id}`} className="suggestion-item">
                <img src={suggestion.image_url} alt={suggestion.name} />
                <p>{suggestion.name}</p>
              </a>
            ))}
          </div>
        ) : (
          <p>No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
