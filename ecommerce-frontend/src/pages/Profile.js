// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import API from '../utils/api';

function Profile() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch current profile info
    API.get('/users/me')
      .then(res => setForm({ name: res.data.name, email: res.data.email }))
      .catch(() => setMessage('Failed to load profile'));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.put('/users/me', form);
      setMessage('Profile updated!');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br/>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br/>
        <button type="submit">Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Profile;
