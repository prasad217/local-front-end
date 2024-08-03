import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch'; // Ensure the path is correct
import cartIcon from './images/cart.png';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`https://local-treasures.onrender.com/api/user/info`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
          if (response.ok) {
            const data = await response.json();
            setUserName(data.username);
            setIsLoggedIn(true);
          }
        } else {
          console.error('Received non-JSON response:', await response.text());
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`https://local-treasures.onrender.com/logout`, {
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
      '/checkout',
      '/order-confirmation',
      '/',
      '/products',
      '/cart',
    ];

    const isAllowedStaticPath = allowedPaths.includes(location.pathname);

    const productPagePattern = /^\/product\/\d+$/;

    const categoryPagePattern = /^\/category\/[a-zA-Z0-9_-]+$/;

    const isProductPage = productPagePattern.test(location.pathname);
    const isCategoryPage = categoryPagePattern.test(location.pathname);

    return isAllowedStaticPath || isProductPage || isCategoryPage;
  };

  if (!shouldRenderNavbar()) {
    return null;
  }

  return (
    <nav className="nav">
      <div className="container">
        <h1>SHOP IT IN A SWAG</h1>
        <ToggleSwitch />
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
