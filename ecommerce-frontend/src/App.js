import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';
import Cart from './pages/cart';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';

function App() {
  return (
    <>
      <nav style={{ marginBottom: '1rem' }}>
        <NavLink to="/" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Home</NavLink>
        <NavLink to="/products" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Products</NavLink>
        <NavLink to="/cart" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Cart</NavLink>
        <NavLink to="/signup" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Sign Up</NavLink>
        <NavLink to="/login" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Log In</NavLink>
        <NavLink to="/profile" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Profile</NavLink>
        <NavLink to="/orderhistory" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>OrderHistory</NavLink>
      </nav>
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
