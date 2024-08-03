import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function OrderConfirmation() {
  // Placeholder for order details. You might fetch these from state, props, or an API.
  const orderDetails = {
    orderId: '123456789', // Example order ID
    estimatedDelivery: 'April 12, 2024', // Example estimated delivery
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Thank You for Your Order!</h1>
      <p style={styles.paragraph}>
        Your order has been placed successfully. You will receive a confirmation email shortly with your order details.
      </p>
      <div style={styles.orderDetails}>
        <h2 style={styles.detailsHeader}>Order Details</h2>
        <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
        <p><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
      </div>
      <div style={styles.actions}>
        <Link to="/" style={styles.link}>Continue Shopping</Link>
        {/* Add more links or buttons as needed */}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#e0f7fa', // Light blue background
  },
  header: {
    color: '#4CAF50', // Example color
  },
  paragraph: {
    lineHeight: '1.6',
  },
  orderDetails: {
    background: '#f5f5f5', // Light grey background for the order details section
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
    background: '#4CAF50', // Matching the header color
    color: '#ffffff', // White text for contrast
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none', // Remove underline from link
    fontWeight: 'bold',
  },
};

export default OrderConfirmation;
