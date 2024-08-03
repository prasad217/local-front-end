import React, { useState, useEffect } from 'react';

function DealerOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://local-treasures.onrender.com/dealer/orders`, {
      method: 'GET',
      credentials: 'include', // Ensures cookies, such as session cookies, are sent with the request
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      // Assuming data is an array of orders
      setOrders(data);
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to load orders. Please try again later.');
    });
  }, []);

  const renderOrders = () => {
    return orders.map((order) => (
      <div key={order.orderId} style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
        <h2>Order ID: {order.orderId}</h2>
        <p>Product: {order.name} (Quantity: {order.quantity})</p>
        <p>Total Price: ${formatPrice(order.total_price)}</p>
      </div>
    ));
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  return (
    <div>
      <h1>Dealer Orders</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {orders.length > 0 ? renderOrders() : <p>No orders found.</p>}
    </div>
  );
}

export default DealerOrders;
