import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    const storedAddedToCart = JSON.parse(localStorage.getItem('addedToCart'));
    if (storedAddedToCart) {
      setAddedToCart(storedAddedToCart);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('addedToCart', JSON.stringify(addedToCart));
  }, [addedToCart]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const addToCart = async (productId, event) => {
    event.stopPropagation(); // Prevent navigation when clicking "Add to Cart"
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ productId }),
      });
  
      if (response.ok) {
        setAddedToCart(prevState => ({...prevState, [productId]: true}));
        alert("Product added to cart!");
      } else if (response.status === 401) {
        alert("You need to sign in to add products to the cart.");
        window.location.href = "http://localhost:3000/signin";
      } else {
        throw new Error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const goToCart = () => {
    window.location.href = "/cart.html";
  };
  
  return (
    <div className="container products">
      <h1>Products</h1>
      <section className="products-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image_url} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Price: ₹{product.actual_cost}</p>
              <p>Discount Price: ₹{product.discount_price}</p>
            </Link>
            {addedToCart[product.id] ? (
              <button onClick={goToCart}>Go to Cart</button>
            ) : (
              <button onClick={(event) => addToCart(product.id, event)}>Add to Cart</button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Products;
