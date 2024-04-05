import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Categories from './components/Categories';
import Products from './components/Products';
import SignIn from './components/SignIn'; // Normal sign-in element
import RegistrationForm from './components/RegistrationForm'; // Normal registration element
import DealerSignIn from './components/DealerSignIn'; // Dealer sign-in element
import DealerRegistration from './components/DealerRegistration'; // Dealer registration element
import DealerHome from './components/DealerHome'; // Dealer home element
import ProductDetail from './components/ProductDetail';
import CategoryProducts from './components/CategoryProducts';
import './components/Navbar.css';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import Checkout from './components/Checkout';
import DealerOrders from './components/DealerOrders';

function App() {
  return (
    <Router>
      <div>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
