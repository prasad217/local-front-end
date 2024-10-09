import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoryProducts.module.css';

function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:31340/api/products/category/${categoryName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error("Failed to fetch products", error));
  }, [categoryName]);

  const addToCart = (productId) => {
    // Assuming you have a user session and the API expects a productId
    fetch(`http://localhost:31340/api/cart`, {
      method: 'POST',
      credentials: 'include', // for session cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not add product to cart');
      }
      return response.json();
    })
    .then(data => {
      alert('Product added to cart successfully'); // Or update state to show in UI
    })
    .catch(error => {
      console.error("Failed to add product to cart", error);
    });
  };

  if (products.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className={styles['products-container']}>
      <h2>Products in {categoryName.replace(/-/g, ' ')}</h2>
      <div className={styles['products-grid']}>
        {products.map(product => (
          <div key={product.id} className={styles['product-card']}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image_url} alt={product.name} className={styles['product-card-img']} />
              <div className={styles['product-info']}>
                <h3>{product.name}</h3>
                <p>Price: ₹{product.actual_cost}</p>
                <p>Discount Price: ₹{product.discount_price}</p>
              </div>
            </Link>
            <button className={styles['add-to-cart-btn']} onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
