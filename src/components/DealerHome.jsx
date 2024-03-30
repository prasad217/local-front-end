import React, { useState, useEffect } from 'react';

function DealerHome() {
  const [dealerInfo, setDealerInfo] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const fetchDealerInfo = async () => {
      try {
        const response = await fetch('http://localhost:3001/dealer/info', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setDealerInfo(data);
        } else {
          console.error('Failed to fetch dealer info: Response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching dealer info:', error.message);
      }
    };

    fetchDealerInfo();
  }, []);

  const handleImageTypeChange = (event) => {
    const imageInput = document.getElementById('image');
    const imageUrlInput = document.getElementById('imageUrlInput');
    if (event.target.value === 'upload') {
      imageInput.style.display = 'block';
      imageUrlInput.style.display = 'none';
    } else {
      imageInput.style.display = 'none';
      imageUrlInput.style.display = 'block';
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/dealer/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        window.location.href = '/dealersignin';
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const addProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:3001/dealer/addProduct', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (response.ok) {
        setFormMessage('Product added successfully');
        event.target.reset(); // Reset form after successful submission
        setShowForm(false); // Optionally hide form
      } else {
        setFormMessage('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      setFormMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="container">
      <button onClick={handleLogout}>Logout</button>
      <h2>Welcome, {dealerInfo.name || 'Dealer'}!</h2>
      {formMessage && <p>{formMessage}</p>}
      <button id="add-product-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Product'}
      </button>
      {showForm && (
       <form id="add-product-form" onSubmit={addProduct} encType="multipart/form-data">
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
        
<div id="uploadImageContainer" style={{ display: 'block' }}> {/* Initially shown */}
  <label htmlFor="image">Upload Image:</label>
  <input type="file" id="image" name="image" accept="image/*" />
</div>

<div id="imageUrlContainer" style={{ display: 'none' }}> {/* Initially hidden */}
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
      )}
    </div>
  );
}

export default DealerHome;
