// src/components/NearbyNavbar.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cartIcon from './images/nearbycart.png'; // Ensure the image path is correct
import styles from './NearbyNavbar.module.css'; // Updated to import as a module
function NearbyNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/info', {
          method: 'GET',
          credentials: 'include',
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

  const shouldRenderNavbar = () => {
    const allowedPaths = [
      '/dealers/nearby',
      '/dealers/1/products' // Adjust if needed
    ];

    return allowedPaths.some(path => 
      location.pathname === path || location.pathname.match(new RegExp(path.replace(/:\w+/g, '\\d+')))
    );
  };

  if (!shouldRenderNavbar()) {
    return null;
  }

  return (
    <nav className={styles.nearbyNavbar}>
      <div className={styles.container}>
        <h1 className={styles.title}>Nearby Dealers</h1>
        <div className={styles.navRight}>
          <Link to="/nearby/cart">
            <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
          </Link>
          {isLoggedIn ? (
            <div className={styles.userName} onClick={() => setShowMenu(!showMenu)}>
              {userName}
              {showMenu && (
                <div className={styles.userMenu}>
                  <Link to="/profile" className={styles.menuItem}>Profile</Link>
                  <Link to="/orders" className={styles.menuItem}>Orders</Link>
                  <Link to="/help" className={styles.menuItem}>Help</Link>
                  <button onClick={handleLogout} className={styles.menuItem}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.signinButton}>
              <Link to="/signin">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NearbyNavbar;

