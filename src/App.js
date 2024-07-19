// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NearbyNavbar from './components/NearbyNavbar';
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
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import Checkout from './components/Checkout';
import DealerOrders from './components/DealerOrders';
import DeliveryRegistration from './components/DeliveryRegistration';
import DeliveryAgentSignIn from './components/DeliveryAgentSignIn';
import NearbyDealers from './components/NearbyDealers';
import DealerProducts from './components/DealerProducts';
import NearbyProductsCart from './components/NearbyProductsCart';
import NearbyCheckout from './components/NearbyCheckout';
import NearbyOrderConfirmation from './components/NearbyOrderConfirmation';
import DeliveryAgentHome from './components/DeliveryAgentHome';
import OrderHistory from './components/OrderHistory';
import ProfilePage from './components/ProfilePage';
import './components/Navbar.css';

function App() {
  return (
    <Router>
      <Navbar />
      <NearbyNavbar />
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
        <Route path="/dealers/nearby" element={<NearbyDealers />} />
        <Route path="/dealers/:dealerId/products" element={<DealerProducts />} />
        <Route path="/nearby/cart" element={<NearbyProductsCart />} />
        <Route path="/nearby/checkout" element={<NearbyCheckout />} />
        <Route path="/nearby/order-confirmation" element={<NearbyOrderConfirmation />} />
        <Route path="/delivery-agent/home" element={<DeliveryAgentHome />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
