import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DealerProducts.module.css'; // Import CSS module for styling

function DealerProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { dealerId } = useParams();

  useEffect(() => {
    const fetchDealerProducts = async () => {
      try {
        const response = await fetch(`https://local-treasures.onrender.com/api/dealers/${dealerId}/products`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching dealer's products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchDealerProducts();
  }, [dealerId]);

  const addToNearbyCart = async (productId, dealerId) => {
    try {
      const response = await fetch(`https://local-treasures.onrender.com/api/nearby/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, dealerId }),
      });
      if (response.status === 409) {  // Conflict status indicates a different dealer's product
        const result = await response.json();
        if (result.actionRequired === 'replace') {
          const replaceConfirmed = window.confirm(result.error + " Do you want to replace the cart?");
          if (replaceConfirmed) {
            replaceCart(productId, dealerId); // Call replaceCart if user confirms
          }
        }
      } else if (!response.ok) {
        throw new Error(`Failed to add: ${response.statusText}`);
      } else {
        const data = await response.json();
        alert(data.message); // Success message
      }
    } catch (error) {
      console.error('Error adding product to nearby cart:', error);
      alert('Failed to add product to nearby cart. Please try again later.');
    }
  };

  const replaceCart = async (productId, dealerId) => {
    try {
      const response = await fetch(`https://local-treasures.onrender.com/api/nearby/cart/replace`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, dealerId }),
      });
      if (!response.ok) {
        throw new Error('Failed to replace cart');
      }
      const data = await response.json();
      alert(data.message); // Notify user
    } catch (error) {
      console.error('Error replacing cart:', error);
      alert('Error replacing the cart: ' + error.message);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Dealer's Products</h1>
      <section className={styles.productsContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image_url} alt={product.name} className={styles.productImage} />
            <h2>{product.name}</h2>
            <p>Price: ₹{product.actual_cost}</p>
            <p>Discount Price: ₹{product.discount_price}</p>
            <button onClick={() => addToNearbyCart(product.id, dealerId)} className={styles.addToCartButton}>
              Add to Nearby Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DealerProducts;
