import React, { useEffect, useState } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use the environment variable to get the API URL
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

    // Retrieve addedToCart state from local storage
    const storedAddedToCart = JSON.parse(localStorage.getItem('addedToCart'));
    if (storedAddedToCart) {
      setAddedToCart(storedAddedToCart);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    // Store addedToCart state in local storage
    localStorage.setItem('addedToCart', JSON.stringify(addedToCart));
  }, [addedToCart]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to handle adding a product to the cart
  const addToCart = async (productId) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
  
      if (response.ok) {
        // Set addedToCart state for this product
        setAddedToCart(prevState => ({
          ...prevState,
          [productId]: true
        }));
        alert("Product added to cart!");
      } else if (response.status === 401) {
        alert("You need to sign in to add products to the cart.");
        window.location.href = "/signin.html"; // Redirect to the sign-in page
      } else {
        throw new Error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Function to handle redirecting to cart page
  const goToCart = () => {
    window.location.href = "/cart.html";
  };
  
  return (
    <div className="container products">
      <h1>Products</h1>
      <section className="products-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ₹{product.actual_cost}</p>
            <p>Discount Price: ₹{product.discount_price}</p>
            {addedToCart[product.id] ? (
              <button onClick={goToCart}>Go to Cart</button>
            ) : (
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Products;
