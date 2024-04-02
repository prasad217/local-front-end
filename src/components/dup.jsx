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

  useEffect(() => {
    // Placeholder for your API call to fetch addresses
    fetch('http://localhost:3001/api/users/addresses', {
      method: 'GET',
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0].id.toString()); // Ensure the selectedAddress is a string if your IDs are numeric
      }
    })
    .catch((error) => console.error('Error:', error));
  }, []);

  // This function updates the selectedAddress state based on the selected radio button
  const handleSelectAddress = (e) => {
    setSelectedAddress(e.target.value);
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
    // Placeholder for your API call to submit the address
    console.log('Address submitted', address);
    // Add logic to handle the address submission
  };

  return (
    <div>
      <h1>Checkout</h1>

      {addresses.length > 0 && (
        <>
          <h2>Available Addresses</h2>
          {addresses.map((addr) => (
            <div key={addr.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <input
                type="radio"
                id={`address-${addr.id}`}
                name="selectedAddress"
                value={addr.id.toString()} // Ensure the value is a string if your IDs are numeric
                checked={selectedAddress === addr.id.toString()} // Matching the value as string
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

      {/* Form for submitting a new address */}
      <form onSubmit={handleSubmit}>
        <h2>Add Address</h2>
        {/* Input fields for address details */}
        {/* Implement the rest of your form fields here */}
        <button type="submit">Submit Address</button>
      </form>
    </div>
  );
}

export default Checkout;
