import React, { useState, useEffect } from 'react';

function DealerHome() {
 // eslint-disable-next-line
const [dealerId, setDealerId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchDealerId = async () => {
      try {
        const response = await fetch('http://localhost:3001/dealer/id', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setDealerId(data.dealerId);
        } else {
          throw new Error('Failed to fetch dealerId');
        }
      } catch (error) {
        console.error('Error fetching dealerId:', error.message);
      }
    };

    fetchDealerId();
  }, []); // Fetch dealerId once on component mount

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleImageTypeChange = (event) => {
    const { value } = event.target;
    if (value === 'upload') {
      document.getElementById('uploadImage').style.display = 'block';
      document.getElementById('imageUrl').style.display = 'none';
      document.getElementById('image').setAttribute('required', '');
    } else {
      document.getElementById('uploadImage').style.display = 'none';
      document.getElementById('imageUrl').style.display = 'block';
      document.getElementById('image').removeAttribute('required');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/dealer/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent with the request
      });
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      window.location.href = '/dealersignin'; // Redirect to dealer sign-in page after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const addProduct = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:3001/dealer/addProduct', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Ensure cookies are sent with the request
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Optionally handle success response
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div className="container">
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <h2>Add Product</h2>
      <button id="add-product-btn" onClick={toggleForm}>Add Product</button>
      <form id="add-product-form" onSubmit={addProduct} encType="multipart/form-data" style={{ display: showForm ? 'block' : 'none' }}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="imageType">Image Type:</label>
          <select
            id="imageType"
            name="imageType"
            required
            onChange={handleImageTypeChange}
          >
            <option value="upload">Upload Image</option>
            <option value="url">Image URL</option>
          </select>
        </div>

        <div id="uploadImage">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
          />
        </div>

        <div id="imageUrl" style={{ display: 'none' }}>
          <label htmlFor="imageUrlInput">Image URL:</label>
          <input type="url" id="imageUrlInput" name="imageUrlInput" />
        </div>

        <div>
          <label htmlFor="actualCost">Actual Cost:</label>
          <input
            type="number"
            id="actualCost"
            name="actualCost"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="discountPrice">Discount Price:</label>
          <input
            type="number"
            id="discountPrice"
            name="discountPrice"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="instockqty">In Stock Quantity:</label>
          <input type="number" id="instockqty" name="instockqty" required />
        </div>
        
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" required>
            <option value="">Select category</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="electronics">Electronics</option>
            <option value="laptops">Laptops</option>
            <option value="mobiles">Mobiles</option>
            <option value="fashion">Clothing</option>
            <option value="medicines">MediCart</option>
            <option value="toystore">Toystore</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows="4" cols="50"></textarea>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default DealerHome;
