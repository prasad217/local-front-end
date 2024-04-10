import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cartIcon from './images/cart.png';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

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

  // Function to determine if the Navbar should be rendered
  const shouldRenderNavbar = () => {
    const allowedPaths = [
      '/checkout',
      '/order-confirmation',
      '/',
      '/products',
      '/cart',
    ];
  
    // Check if the current pathname matches any of the allowed static paths
    const isAllowedStaticPath = allowedPaths.includes(location.pathname);
  
    // Pattern to match product pages (e.g., /product/2)
    const productPagePattern = /^\/product\/\d+$/; // \d+ matches one or more digits
  
    // Pattern to match category pages (e.g., /category/electronics)
    const categoryPagePattern = /^\/category\/[a-zA-Z0-9_-]+$/; // Matches alphanumeric characters, including dashes and underscores
  
    const isProductPage = productPagePattern.test(location.pathname);
    const isCategoryPage = categoryPagePattern.test(location.pathname);
  
    // Return true if the current path matches any of the conditions
    return isAllowedStaticPath || isProductPage || isCategoryPage;
  };
  

  if (!shouldRenderNavbar()) {
    return null;
  }

  return (
    <nav className="nav">
      <div className="container">
        <h1>SHOP IT IN A SWAG</h1>
        <div className="navRight">
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          </Link>
          {isLoggedIn ? (
            <div className="userName" onClick={() => setShowMenu(!showMenu)}>
              {userName}
              {showMenu && (
                <div className="userMenu">
                  <Link to="/profile" className="menu-item">Profile</Link>
                  <Link to="/orders" className="menu-item">Orders</Link>
                  <Link to="/help" className="menu-item">Help</Link>
                  <button onClick={handleLogout} className="menu-item">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="signinButton">
              <Link to="/signin">Sign In</Link>
            </div>
          )}
           <div className="navRight">
          {/* Existing nav items... */}
          {/* Add Get Nearby Stores Button */}
          <Link to="/dealers/nearby" className="nearbyStoresButton">
            Get Nearby Stores
          </Link>
          {/* Cart, Profile/Sign In links remain the same */}
        </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
