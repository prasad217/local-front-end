import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="container">
        <h1>SHOP IT IN A SWAG</h1>
        <div style={{ float: 'right' }}>
        <Link to="/signin">Sign In</Link> {/* Style this as a button */}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
