import React, { useState, useEffect } from 'react';

function DealerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDealerOrders();
  }, []);

  const fetchDealerOrders = async () => {
    try {
      const response = await fetch('/api/dealer/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch dealer orders');
      }
    } catch (error) {
      console.error('Error fetching dealer orders:', error);
    }
  };

  return (
    <div>
      <h1>Dealer Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.total_price}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DealerOrders;
