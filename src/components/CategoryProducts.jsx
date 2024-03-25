import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/category/${categoryName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error("Failed to fetch products", error));
  }, [categoryName]);

  if (products.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className="products-container">
      <h2>Products in {categoryName.replace(/-/g, ' ')}</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Price: ₹{product.actual_cost}</p>
                <p>Discount Price: ₹{product.discount_price}</p>
              </div>
            </Link>
            {/* Add to Cart button can be implemented here as well */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
