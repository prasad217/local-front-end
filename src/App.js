// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Categories from './components/Categories';
import Products from './components/Products';
import SignIn from './components/SignIn';
import RegistrationForm from './components/RegistrationForm';
import DealerSignIn from './components/DealerSignIn';
import DealerRegistration from './components/DealerRegistration';
import DealerHome from './components/DealerHome';
import ProductDetail from './components/ProductDetail';
import CategoryProducts from './components/CategoryProducts';
import './components/Navbar.css';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import Checkout from './components/Checkout';
import DealerOrders from './components/DealerOrders';
import DeliveryRegistration from './DeliveryRegistration';
import DeliveryAgentSignIn from './components/DeliveryAgentSignIn';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Slider /><Categories /><Products /></>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dealersignin" element={<DealerSignIn />} />
        <Route path="/dealer/register" element={<DealerRegistration />} />
        <Route path="/dealerhome" element={<DealerHome />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/dealer/orders" element={<DealerOrders />} />
        <Route path="/delivery-agent/register" element={<DeliveryRegistration />} />
        <Route path="/delivery-agent/signin" element={<DeliveryAgentSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
