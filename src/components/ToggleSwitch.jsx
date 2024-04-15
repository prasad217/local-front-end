
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


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

      <style jsx>{`
        .toggle-switch {
          display: flex;
          align-items: center;
          background-color: #333;
          border-radius: 20px;
        }

        .toggle-option {
          padding: 10px ;
          color: white;
          background-color: black;
          cursor: pointer;
        }

        .active {
          background-color: green;
        }
      `}</style>
    </div>
  );
};

export default ToggleSwitch;