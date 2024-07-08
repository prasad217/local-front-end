import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

function DealerHome() {
  const [dealerInfo, setDealerInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [nearbyOrders, setNearbyOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/dealer/products/${dealerInfo.dealerId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  }, [dealerInfo.dealerId]);

  const fetchNearbyOrders = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/dealer/nearbyOrders/${dealerInfo.dealerId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setNearbyOrders(data);
      } else {
        console.error('Failed to fetch nearby orders');
      }
    } catch (error) {
      console.error('Error fetching nearby orders:', error.message);
    }
  }, [dealerInfo.dealerId]);

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
          fetchProducts();
          fetchNearbyOrders();
        } else {
          console.error('Failed to fetch dealer info: Response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching dealer info:', error.message);
      }
    };

    fetchDealerInfo();
  }, [fetchProducts, fetchNearbyOrders]);

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
        setFormMessage('Product successfully added.');
        event.target.reset(); // Reset form after successful submission
        setShowForm(false); // Optionally hide form
        fetchProducts(); // Fetch updated product list
      } else {
        setFormMessage('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      setFormMessage('Error adding product: ' + error.message);
    }
  };

  const deleteproduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/dealer/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      fetchProducts(); // Refresh products after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <button onClick={handleLogout}>Log Out</button>
      <Link to="/dealer/orders">
        <button>View All Orders</button>
      </Link>
      <button onClick={fetchNearbyOrders}>View Nearby Orders</button>
      <h2>Welcome, {dealerInfo.name || 'Dealer'}!</h2>
      {formMessage && <p>{formMessage}</p>}
      <button id="add-product-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel Addition' : 'Add New Product'}
      </button>
      {showForm && (
        <form id="add-product-form" onSubmit={addProduct} encType="multipart/form-data">
          <div>
            <label htmlFor="name">Product Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="imageType">Select Image Type:</label>
            <select id="imageType" name="imageType" required onChange={handleImageTypeChange}>
              <option value="upload">Upload Image</option>
              <option value="url">Image URL</option>
            </select>
          </div>
          <div id="uploadImageContainer" style={{ display: 'none' }}>
            <label htmlFor="image">Upload Product Image:</label>
            <input type="file" id="image" name="image" accept="image/*" />
          </div>
          <div id="imageUrlContainer" style={{ display: 'none' }}>
            <label htmlFor="imageUrlInput">Product Image URL:</label>
            <input type="url" id="imageUrlInput" name="imageUrlInput" />
          </div>
          <div>
            <label htmlFor="actualCost">Retail Price:</label>
            <input type="number" id="actualCost" name="actualCost" step="0.01" required />
          </div>
          <div>
            <label htmlFor="discountPrice">Discounted Price:</label>
            <input type="number" id="discountPrice" name="discountPrice" step="0.01" required />
          </div>
          <div>
            <label htmlFor="instockqty">Available Stock Quantity:</label>
            <input type="number" id="instockqty" name="instockqty" required />
          </div>
          <div>
            <label htmlFor="category">Product Category:</label>
            <select id="category" name="category" required>
              <option value="">--Please Select a Category--</option>
              <option value="home-appliances">Home Appliances</option>
              <option value="electronics">Electronics</option>
              <option value="laptops">Laptops</option>
              <option value="mobiles">Mobiles</option>
              <option value="fashion">Clothing</option>
              <option value="medicines">Medicines</option>
              <option value="toystore">Toys</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Product Description:</label>
            <textarea id="description" name="description" rows="4" cols="50"></textarea>
          </div>
          <button type="submit">Submit Product</button>
        </form>
      )}
      <h3>Uploaded Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Retail Price</th>
            <th>Discounted Price</th>
            <th>Category</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td><img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{product.description}</td>
              <td>${product.actual_cost}</td>
              <td>${product.discount_price}</td>
              <td>{product.category}</td>
              <td>{product.instockqty}</td>
              <td>
                <button onClick={() => {/* edit stock logic here */}}>Edit Stock</button>
                <button onClick={() => deleteproduct(product.id)}>Remove</button>
                <button onClick={() => {/* change price logic here */}}>Change Price</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DealerHome;
