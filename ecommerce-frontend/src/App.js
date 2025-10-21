import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';
import Cart from './pages/cart';

function App() {
  return (
    <>
      <nav style={{ marginBottom: '1rem' }}>
        <NavLink to="/" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Home</NavLink>
        <NavLink to="/products" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Products</NavLink>
        <NavLink to="/cart" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Cart</NavLink>
        <NavLink to="/signup" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Sign Up</NavLink>
        <NavLink to="/login" style={({ isActive }) => ({ marginRight: '1rem', fontWeight: isActive ? 'bold' : 'normal' })}>Log In</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
