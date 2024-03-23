import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    fetch('http://localhost:3001/api/cart', {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      return response.json();
    })
    .then(data => {
      setCartItems(data); // Assuming data is an array of cart items
    })
    .catch(error => {
      console.error('Error fetching cart items:', error);
    });
  };

  const deleteCartItem = (productId) => {
    fetch(`http://localhost:3001/api/cart/${productId}`, {
      method: 'DELETE',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }
      fetchCartItems(); // Refresh cart items after deletion
    })
    .catch(error => {
      console.error('Error deleting cart item:', error);
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    fetch(`http://localhost:3001/api/cart/items/${productId}`, {
      method: 'PATCH',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newQuantity }) // assuming this is how you update quantity
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
      }
      fetchCartItems(); // Refresh cart items after update
    })
    .catch(error => {
      console.error('Error updating cart item quantity:', error);
    });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="product-card">
              <img src={item.image_url} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              {/* Buttons to update quantity and remove item */}
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>Decrease Quantity</button>
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>Increase Quantity</button>
              <button onClick={() => deleteCartItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
