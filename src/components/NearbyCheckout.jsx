import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NearbyCheckout() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [userLongitude, setUserLongitude] = useState(null);

  // Fetch user's longitude
  useEffect(() => {
    fetch(`http://localhost:3000/api/user/longitude`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setUserLongitude(data.longitude);
      })
      .catch(error => {
        console.error('Error fetching user longitude:', error);
      });
  }, []);

  // Fetch nearby addresses
  useEffect(() => {
    if (userLongitude !== null) {
      fetch(`http://localhost:3000/api/users/nearby-addresses`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          // Filter addresses based on user's longitude
          const filteredAddresses = data.filter(address => address.longitude === userLongitude);
          setAddresses(filteredAddresses);
          if (filteredAddresses.length > 0) {
            setSelectedAddress(filteredAddresses[0].id);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setError('Failed to load nearby addresses. Please try again later.');
        });
    }
  }, [userLongitude]);
  // Rest of the component code...
  const handleSelectAddress = event => {
    setSelectedAddress(event.target.value);
  };

  // Calculate totalPrice
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = () => {
    const orderDetails = {
      addressId: selectedAddress,
      items: cartItems.map(item => ({ productId: item.product_id, quantity: item.quantity })),
      totalPrice: totalPrice,
    };

    fetch('http://localhost:3000/api/nearby-orders', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then(data => {
        console.log("Order placed successfully", data);
        setCartItems([]); // Clear the cart in the frontend
        navigate('/order-confirmation'); // Navigate to confirmation page or show success message
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors (e.g., show an error message to the user)
      });
  };

  return (
    <div>
      <h1>Nearby Checkout</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {addresses.length > 0 && (
        <div>
          <h2>Nearby Addresses</h2>
          {addresses.map((addr) => (
            <div key={addr.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <input
                type="radio"
                id={`address-${addr.id}`}
                name="selectedAddress"
                value={addr.id.toString()}
                checked={selectedAddress === addr.id.toString()}
                onChange={handleSelectAddress}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor={`address-${addr.id}`} style={{ fontWeight: "bold" }}>
                Select This Address
              </label>
              <div><strong>Name:</strong> {addr.name}</div>
              <div><strong>Address:</strong> {addr.address}</div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Order Section */}
      <div>
        <h2>Preview Order</h2>
        {cartItems.length > 0 ? (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>{`${item.name} X ${item.quantity} = ${item.price * item.quantity}`}</li>
              ))}
            </ul>
            <p><strong>Total Price: </strong>{totalPrice}</p>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Place Order Button */}
      <div style={{ padding: '20px 0' }}>
        <button onClick={placeOrder} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default NearbyCheckout;
