import React, { useState, useEffect } from 'react';

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
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
  const [error, setError] = useState(''); // State for storing error messages

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/addresses`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddress(data[0].id);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to load addresses. Please try again later.'); // Update error state
      });
  }, []);

  const handleSelectAddress = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/address`, {
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
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to submit the address. Please try again.'); // Update error state
      });
  };
  return (
    <div>
      <h1>Checkout</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {addresses.length > 0 && (
        <>
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
 </>
      )}

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
    </div>
  );
}
export default Checkout;
