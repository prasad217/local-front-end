import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ToggleSwitch.css'; // Move the styles to a CSS file

const ToggleSwitch = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <div className="toggle-switch">
      <Link to="/dealers/nearby">
        <div
          className={`toggle-option ${activeTab === '/dealers/nearby' ? 'active' : ''}`}
          onClick={() => setActiveTab('/dealers/nearby')}
        >
          Nearby Stores
        </div>
      </Link>
      <Link to="/">
        <div
          className={`toggle-option ${activeTab === '/' ? 'active' : ''}`}
          onClick={() => setActiveTab('/')}
        >
          Online Store
        </div>
      </Link>
    </div>
  );
};

export default ToggleSwitch;
