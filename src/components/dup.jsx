import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DealerHome() {
  const [dealerInfo, setDealerInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [imageType, setImageType] = useState('upload'); // Default to 'upload'

  useEffect(() => {
    fetchDealerInfo();
  }, []); // Removed dependency to avoid refetching on every re-render if function changes

  const fetchDealerInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/dealer/info', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setDealerInfo(data);
        fetchProducts(data.dealerId); // Ensuring dealerId is available
      } else {
        console.error('Failed to fetch dealer info');
      }
    } catch (error) {
      console.error('Error fetching dealer info:', error);
    }
  };

  const fetchProducts = async (dealerId) => {
    try {
      const response = await fetch(`http://localhost:3001/dealer/products/${dealerId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        setProducts(await response.json());
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImageTypeChange = (event) => {
    setImageType(event.target.value);
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
      });
      if (response.ok) {
        fetchProducts(dealerInfo.dealerId); // Refresh product list after deletion
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };