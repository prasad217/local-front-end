// src/components/NearbyNavbar.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
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
      '/dealers/:id/products',
      '/nearby/cart' ,
      '/nearby/checkout',
      '/nearby/order-confirmation'
    ];
  
    return allowedPaths.some(path => {
      // Replace path parameters like :id with regex to match any number
      const regex = new RegExp("^" + path.replace(/:\w+/g, '\\d+') + "$");
      return regex.test(location.pathname);
    });
  };

  if (!shouldRenderNavbar()) {
    return null;
  }

  return (
    <nav className={styles.nearbyNavbar}>
      <div className={styles.container}>
        <h1 className={styles.title}>Nearby Dealers</h1>
        <ToggleSwitch />
        <div className={styles.navRight}>
          <Link to="/nearby/cart">
            <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
          </Link>
          {isLoggedIn ? (
            <div className={styles.userName} onClick={() => setShowMenu(!showMenu)}>
              {userName}
              {showMenu && (
  <div className={styles.userMenu}>
    <div className={styles.menuItem}>
      <Link to="/profile">Profile</Link>
    </div>
    <div className={styles.menuItem}>
      <Link to="/orders">Orders</Link>
    </div>
    <div className={styles.menuItem}>
      <Link to="/help">Help</Link>
    </div>
    <div className={styles.menuItem}>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
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

