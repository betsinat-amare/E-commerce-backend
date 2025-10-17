import React, { useEffect, useState } from 'react';
import API from '../utils/api';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view your cart.');
      setLoading(false);
      return;
    }
    try {
      const res = await API.get('/cart');
      setCart(res.data.items || []);
    } catch (err) {
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };
  fetchCart();
}, []);


  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;
  if (!cart.length) return <p>Your cart is empty.</p>;

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.product._id}>
            {item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}

export default Cart;
