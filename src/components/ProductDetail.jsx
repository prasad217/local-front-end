import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Fetch product details by ID first
    fetch(`http://localhost:31340/api/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        // Then fetch related products by the fetched product's category
        // Check if the category is available before fetching
        if (data.category) {
          return fetch(`http://localhost:31340/api/products/category/${data.category}`);
        }
        return Promise.resolve({ json: () => [] }); // Resolve to an empty array if no category
      })
      .then(response => response.json())
      .then(data => setRelatedProducts(data))
      .catch(error => console.error("Failed to fetch product or related products", error));
  }, [productId]);

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

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img src={product.image_url} alt={product.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
      <h2>{product.name}</h2>
      <p>Price: ₹{product.actual_cost}</p>
      <p>Discount Price: ₹{product.discount_price}</p>
      <button className='add-to-cart-btn' onClick={() => addToCart(product.id)}>Add to Cart</button>
      <p>{product.description}</p>
      
      <h3>Related Products</h3>
      <div className="related-products">
        {relatedProducts.map((relatedProduct) => (
          <div key={relatedProduct.id} className="related-product">
            <img src={relatedProduct.image_url} alt={relatedProduct.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            <h4>{relatedProduct.name}</h4>
            <p>Price: ₹{relatedProduct.actual_cost}</p>
            <p>Discount Price: ₹{relatedProduct.discount_price}</p>
            {/* Future: Add to Cart Button and other details */}
          </div>
        ))}
      </div>
      
      <h3>Reviews</h3>
      {/* Future: Review section */}
    </div>
  );
}

export default ProductDetail;
