import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Ensure useNavigate is called at the top level of your component

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/cart', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    const quantity = Math.max(newQuantity, 1);

    fetch(`http://localhost:3001/api/cart/items/${productId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update cart item quantity');
        }
        fetchCartItems(); // Refresh cart items after update
      })
      .catch((error) => {
        console.error('Error updating cart item quantity:', error);
      });
  };

  const deleteCartItem = (productId) => {
    fetch(`http://localhost:3001/api/cart/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete cart item');
        }
        fetchCartItems(); // Refresh cart items after deletion
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
      });
  };

  // Calculate total bill
  const totalBill = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleProceedToPay = () => {
    navigate('/checkout'); // Use navigate inside a function, not directly in JSX or conditional statements
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image_url} alt={item.name} className={styles.productImage} />
            <span className={styles.productName}>{item.name}</span>
            <span className={styles.quantityControl}>
              Quantity: {item.quantity}
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
            </span>
            <span className={styles.price}>
  ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
</span>

            <button onClick={() => deleteCartItem(item.id)} className={styles.removeButton}>Remove</button>
          </div>
        ))}
        <div className={styles.totalBill}>
          Total Bill: ${totalBill.toFixed(2)}
          <button className={styles.proceedToPayButton} onClick={handleProceedToPay}>Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
