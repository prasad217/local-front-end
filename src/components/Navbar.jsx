import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from './images/cart.png';

function Navbar() {
  return (
    <nav className="nav">
      <div className="container">
        <h1>SHOP IT IN A SWAG</h1>
        <div className="navRight">
          <div>
            <Link to="/cart">
              <img src={cartIcon} alt="Cart" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            </Link>
          </div>
          <div className="signinButton">
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
