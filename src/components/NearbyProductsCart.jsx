import React, { useState, useEffect } from 'react';
import styles from './NearbyProductsCart.module.css';
import { useNavigate } from 'react-router-dom';

function NearbyProductsCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNearbyCartItems();
  }, []);

  const fetchNearbyCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:31340/api/nearby/cart`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch nearby cart items');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching nearby cart items:', error);
      alert('Failed to fetch cart items.');
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity, dealerId) => {
    if (newQuantity < 1) return;  // Prevent reducing quantity below 1 without deleting the item
    const quantity = Math.max(newQuantity, 1); // Ensure quantity never goes below 1
    try {
      // Handle different dealer scenario
      const hasDifferentDealer = cartItems.some(item => item.dealerId !== dealerId);
      if (hasDifferentDealer) {
        const replaceConfirmed = window.confirm('Adding products from a different dealer will replace your current items. Do you want to proceed?');
        if (!replaceConfirmed) {
          return;
        }
      }

      const response = await fetch(`http://localhost:31340/api/nearby/cart/items/${productId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
      }
      fetchNearbyCartItems(); // Refresh cart items after update
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      alert('Failed to update quantity.');
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:31340/api/nearby/cart/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }
      fetchNearbyCartItems(); // Refresh cart items after deletion
    } catch (error) {
      console.error('Error deleting cart item:', error);
      alert('Failed to remove item.');
    }
  };

  const handleProceedToPay = () => {
    navigate('/nearby/checkout'); // Navigate to the NearbyCheckout page
  };

  if (cartItems.length === 0) {
    return <p>Your nearby cart is empty</p>;
  }

  return (
    <div>
      <h2>Nearby Shopping Cart</h2>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image_url} alt={item.name} className={styles.productImage} />
            <span className={styles.productName}>{item.name}</span>
            <span className={styles.quantityControl}>
              Quantity: {item.quantity}
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1, item.dealerId)}>-</button>
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1, item.dealerId)}>+</button>
            </span>
            <span className={styles.price}>
              ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
            </span>
            <button onClick={() => deleteCartItem(item.id)} className={styles.removeButton}>Remove</button>
          </div>
        ))}
        <div className={styles.totalBill}>
          Total Bill: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          <button className={styles.proceedToPayButton} onClick={handleProceedToPay}>Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
}

export default NearbyProductsCart;
