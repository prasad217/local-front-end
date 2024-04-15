import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation along with Link

function NearbyOrderConfirmation() {
  const location = useLocation(); // This hook provides access to the location object
  const orderDetails = location.state; // Access state passed through the navigation

  // Check if the orderDetails are undefined (e.g., page refresh or direct navigation)
  if (!orderDetails) {
    // You can redirect or display a message
    return <div style={styles.container}>Order details are unavailable. Please check your order history.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Thank You for Your Nearby Order!</h1>
      <p style={styles.paragraph}>
        Your nearby order has been placed successfully. Check your email soon for the confirmation with your order details.
      </p>
      <div style={styles.orderDetails}>
        <h2 style={styles.detailsHeader}>Nearby Order Details</h2>
        <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
        <p><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
      </div>
      <div style={styles.actions}>
        <Link to="/" style={styles.link}>Back to Home</Link>
        {/* Add more links or buttons as needed */}
      </div>
    </div>
  );
}

// Styles remain the same as before
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#e0f7fa', // A light blue background
  },
  header: {
    color: '#01579b', // A deeper blue to stand out against the light background
  },
  paragraph: {
    lineHeight: '1.6',
  },
  orderDetails: {
    background: '#b3e5fc', // A slightly different blue to complement the theme
    borderRadius: '5px',
    padding: '20px',
    margin: '20px 0',
  },
  detailsHeader: {
    margin: '0 0 10px 0',
  },
  actions: {
    marginTop: '20px',
  },
  link: {
    display: 'inline-block',
    background: '#0288d1', // A vibrant blue to draw attention to the call to action
    color: '#ffffff', // White text for contrast
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none', // Remove underline from link
    fontWeight: 'bold',
  },
};

export default NearbyOrderConfirmation;
