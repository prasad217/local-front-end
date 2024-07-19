import React, { useState } from 'react';

function DeliveryAgentHome() {
  const [liveLocationTracking, setLiveLocationTracking] = useState(false);

  const handleToggleSwitch = () => {
    setLiveLocationTracking((prevTracking) => !prevTracking);
    // Call backend API to start/stop live location tracking
    fetch(`${process.env.REACT_APP_API_URL}/delivery-agent/live-location-tracking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tracking: !liveLocationTracking })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error('Error toggling live location tracking:', error);
    });
  };

  return (
    <div>
      <h2>Delivery Agent Home</h2>
      <div>
        <label htmlFor="liveLocationSwitch">Live Location Tracking:</label>
        <input
          type="checkbox"
          id="liveLocationSwitch"
          checked={liveLocationTracking}
          onChange={handleToggleSwitch}
        />
      </div>
    </div>
  );
}

export default DeliveryAgentHome;
