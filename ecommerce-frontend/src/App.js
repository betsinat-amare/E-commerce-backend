import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';      // Import Navbar
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';
import Cart from './pages/cart';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';
import './index.css';

function App() {
  return (
    <>
      <Navbar />  {/* Place Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
