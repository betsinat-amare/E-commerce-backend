// src/pages/Checkout.js
import React, { useState } from 'react';
import { useCartState } from '../context/CartContext';
import API from '../utils/api';

function Checkout() {
  const { items } = useCartState();
  const [form, setForm] = useState({ name: '', address: '', city: '', zip: '', country: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/orders', {
        shipping: form,
        paymentStatus: 'Paid' // use real payment status after integrating Stripe
      });
      setMessage('Order placed successfully!');
    } catch {
      setMessage('Order failed.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required /><br/>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required /><br/>
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required /><br/>
        <input name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} required /><br/>
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required /><br/>
        <button type="submit" disabled={loading}>
          Pay & Place Order
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Checkout;
