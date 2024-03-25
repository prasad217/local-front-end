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
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Slider /><Categories /><Products /></>} exact />
          <Route path="/signin" element={<SignIn />} /> {/* Normal sign-in */}
          <Route path="/register" element={<RegistrationForm />} /> {/* Normal registration */}
          <Route path="/dealersignin" element={<DealerSignIn />} /> {/* Dealer sign-in */}
          <Route path="/dealer/register" element={<DealerRegistration />} />
          <Route path="/dealerhome" element={<DealerHome />} /> 
          <Route path="/product/:productId" element={<ProductDetail />} /> {/* Corrected */}
          <Route path="/category/:categoryName" element={<CategoryProducts />} /> {/* Corrected */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
