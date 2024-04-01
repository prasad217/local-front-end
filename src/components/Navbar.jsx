import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from './images/cart.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/info', {
          method: 'GET',
          credentials: 'include', // Include cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.username);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="nav">
      <div className="container">
        <h1>SHOP IT IN A SWAG</h1>
        <div className="navRight">
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          </Link>
          {isLoggedIn ? (
            <div className="userName">
              <span onClick={() => setShowMenu(!showMenu)}>{userName}</span>
              {showMenu && (
                <div className="userMenu">
                  <div>Account Details</div>
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="signinButton">
              <Link to="/signin">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
