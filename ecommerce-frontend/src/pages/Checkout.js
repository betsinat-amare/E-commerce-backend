import React, { useState } from 'react';
import { useCartState } from '../context/CartContext';
import API from '../utils/api';

function Checkout() {
  const { items } = useCartState();
  const [form, setForm] = useState({ name: '', address: '', city: '', zip: '', country: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckout = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call backend to create Stripe session
      const res = await API.post('/stripe/create-checkout-session', {
        items,
        shipping: form
      });
      window.location.href = res.data.url; // Redirect to Stripe Checkout
    } catch (err) {
      setMessage('Payment failed.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required /> <br />
        <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} required /> <br />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required /> <br />
        <input name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} required /> <br />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required /> <br />
        <button type="submit" disabled={loading}>Pay with Card</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Checkout;
