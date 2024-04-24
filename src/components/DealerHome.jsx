import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

function DealerHome() {
  const [dealerInfo, setDealerInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [nearbyOrders, setNearbyOrders] = useState([]);
  const [dealerOrders, setDealerOrders] = useState([]);
  const [imageType, setImageType] = useState('upload'); // Default to 'upload'
  
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

  const fetchDealerInfo = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/dealer/info', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setDealerInfo(data);
        fetchProducts(); // Fetch products after fetching dealer info
      } else {
        console.error('Failed to fetch dealer info: Response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching dealer info:', error.message);
    }
  }, [fetchProducts]);

  const fetchNearbyOrders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/nearby/orders', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          // Trigger notification for new nearby orders
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`New nearby order received`);
          } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(function(permission) {
              if (permission === 'granted') {
                new Notification(`New nearby order received`);
              }
            });
          }
        }
        setNearbyOrders(data);
      } else {
        console.error('Failed to fetch nearby orders');
      }
    } catch (error) {
      console.error('Error fetching nearby orders:', error.message);
    }
  }, []);

  const fetchDealerOrders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/dealer/orders', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setDealerOrders(data);
      } else {
        console.error('Failed to fetch dealer orders');
      }
    } catch (error) {
      console.error('Error fetching dealer orders:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchDealerInfo();
    fetchNearbyOrders();
    fetchDealerOrders();
  }, [fetchDealerInfo, fetchNearbyOrders, fetchDealerOrders]);

  const handleImageTypeChange = (event) => {
    setImageType(event.target.value);
    const imageInputContainer = document.getElementById('uploadImageContainer');
    const imageUrlInputContainer = document.getElementById('imageUrlContainer');
    if (event.target.value === 'upload') {
      imageInputContainer.style.display = 'block';
      imageUrlInputContainer.style.display = 'none';
    } else {
      imageInputContainer.style.display = 'none';
      imageUrlInputContainer.style.display = 'block';
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
        setShowForm(false);
        fetchProducts(dealerInfo.dealerId); // Refresh products list
      } else {
        setFormMessage('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setFormMessage('Error adding product: ' + error.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/dealer/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        fetchProducts(); // Refresh products after deletion
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <button onClick={handleLogout}>Logout</button>
      <Link to="/dealer/orders">
        <button>View Orders</button>
      </Link>
      <h2>Welcome, {dealerInfo.name || 'Dealer'}!</h2>
      {formMessage && <p>{formMessage}</p>}
      <button id="add-product-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Product'}
      </button>
      {showForm && (
       <form onSubmit={addProduct} encType="multipart/form-data">
       <div>
         <label htmlFor="name">Product Name:</label>
         <input type="text" id="name" name="name" required />
       </div>
       <div>
         <label htmlFor="imageType">Image Type:</label>
         <select id="imageType" name="imageType" required onChange={handleImageTypeChange}>
           <option value="upload">Upload Image</option>
           <option value="url">Image URL</option>
         </select>
       </div>
       {imageType === 'upload' && (
         <div>
           <label htmlFor="image">Upload Image:</label>
           <input type="file" id="image" name="image" accept="image/*" />
         </div>
       )}
       {imageType === 'url' && (
         <div>
           <label htmlFor="imageUrlInput">Image URL:</label>
           <input type="url" id="imageUrlInput" name="imageUrlInput" />
         </div>
       )}
       <div>
         <label htmlFor="actualCost">Actual Cost:</label>
         <input type="number" id="actualCost" name="actualCost" step="0.01" required />
       </div>
       <div>
         <label htmlFor="discountPrice">Discount Price:</label>
         <input type="number" id="discountPrice" name="discountPrice" step="0.01" required />
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
      <h3>Products Uploaded</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actual Cost</th>
            <th>Discount Price</th>
            <th>Category</th>
            <th>In Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td><img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{product.description}</td>
              <td>{product.actual_cost}</td>
              <td>{product.discount_price}</td>
              <td>{product.category}</td>
              <td>{product.instockqty}</td>
              <td>
                <button>Edit Stock</button>
                <button onClick={() => deleteProduct(product.id)}>Remove</button>
                <button>Change Price</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Nearby Orders</h3>
      <div>
        {nearbyOrders.map((order, index) => (
          <div key={index}>
            {index === 0 || nearbyOrders[index - 1].orderId !== order.orderId ? (
              <div>
                <p>Order ID: {order.orderId}</p>
                {order.products.map(product => (
                  <div key={product.productId}>
                    <p>Product: {product.name} (Quantity: {product.quantity})</p>
                    <p>Total Price: ${product.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>Product: {order.products[0].name} (Quantity: {order.products[0].quantity})</p>
                <p>Total Price: ${order.products[0].totalPrice.toFixed(2)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealerHome;
