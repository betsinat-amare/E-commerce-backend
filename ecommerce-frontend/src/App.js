import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/products';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/products">Products</Link> |<Link to="/signup">Sign Up</Link> | <Link to="/login">Log In</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
