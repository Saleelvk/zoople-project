import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Product from './components/Product';
import Shop from './pages/Shop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import CheckOutdetails from './pages/CheckOutdetails';
import OrderComplete from './pages/OrderComplete';
import Myorder from './pages/Myorder';
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen"> {/* Added flex and min-h-screen */}
       {location.pathname !== '/Login' && <Navbar />}
      <div className="flex-grow"> {/* This div will allow the main content to grow */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Myorder' element={<Myorder />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/Product/:productId' element={<Product />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/CheckOut' element={<CheckOutdetails />} />
          <Route path='/Ordercomplete' element={<OrderComplete />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
