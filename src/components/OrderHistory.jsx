import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css'; // Assuming you have a CSS file for styles

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order history for the current user from backend
    fetch('https://local-treasures.onrender.com/api/orders/history')
      .then(response => response.json())
      .then(data => {
        setOrders(data); // Assuming data is an array of orders with items
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
      });
  }, []);

  const handleBuyAgain = (order) => {
    // Implement buy again functionality here
    console.log('Buy again clicked for order:', order);
  };

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <h3>Order ID: {order.id}</h3>
            <p>Total Price: {order.total_price ? parseFloat(order.total_price).toFixed(2) : '-'}</p>
            <p>Date Ordered: {new Date(order.created_at).toLocaleDateString()}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  <Link to={`/product/${item.product_id}`}>
                    <img src={`https://local-treasures.onrender.com/products/${item.image_url}`} alt={item.name} className="product-image" />
                    {item.name}
                  </Link>
                  <p>Qty Ordered: {item.quantity}</p>
                </li>
              ))}
            </ul>
            <button className="buy-again-button" onClick={() => handleBuyAgain(order)}>Buy Again</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
