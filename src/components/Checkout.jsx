import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Checkout() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    door_no: '',
    address_lane: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    phonenumber: '',
  });
  const [error, setError] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Fetch addresses
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/addresses`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0].id);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to load addresses. Please try again later.');
    });
  }, []);

  // Fetch cart items
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      return response.json();
    })
    .then(data => {
      setCartItems(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const handleSelectAddress = event => {
    setSelectedAddress(event.target.value);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/address`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    })
    .then(response => response.json())
    .then(data => {
      setAddress({
        name: '',
        door_no: '',
        address_lane: '',
        landmark: '',
        pincode: '',
        city: '',
        state: '',
        phonenumber: '',
      }); // Reset address form to initial state
      setAddresses([...addresses, data]); // Add the new address to the list
      setSelectedAddress(data.id); // Set the new address as selected
      setShowAddressForm(false); // Hide the form after submission
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Failed to submit the address. Please try again.');
    });
  };

  // Calculate totalPrice
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = () => {
    const orderDetails = {
      addressId: selectedAddress,
      items: cartItems.map(item => ({ productId: item.product_id, quantity: item.quantity })),
      totalPrice: totalPrice,
    };
  
    fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
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
      <h1>Checkout</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {addresses.length > 0 && (
        <div>
          <h2>Available Addresses</h2>
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
              <div><strong>Door No:</strong> {addr.door_no},</div>
              <div><strong>Address Lane:</strong> {addr.address_lane},</div>
              <div><strong>Landmark:</strong> {addr.landmark},</div>
              <div><strong>Pincode:</strong> {addr.pincode},</div>
              <div><strong>City:</strong> {addr.city},</div>
              <div><strong>State:</strong> {addr.state}</div>
              <div><strong>Phone Number:</strong> {addr.phonenumber}</div>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowAddressForm(true)} style={{ margin: "20px 0" }}>Add New Address</button>

      {showAddressForm && (
        <form onSubmit={handleSubmit}>
          <h2>Add Address</h2>
          <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Door No:
            <input
              type="text"
              name="door_no"
              value={address.door_no}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Address Lane:
            <input
              type="text"
              name="address_lane"
              value={address.address_lane}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Landmark:
            <input
              type="text"
              name="landmark"
              value={address.landmark}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Pincode:
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              name="phonenumber"
              value={address.phonenumber}
              onChange={handleInputChange}
            />
          </label>
        </div>
          <button type="submit">Submit Address</button>
        </form>
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
export default Checkout;
