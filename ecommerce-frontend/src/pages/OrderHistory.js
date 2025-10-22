// src/pages/OrderHistory.js
import React, { useEffect, useState } from 'react';
import API from '../utils/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/orders')
      .then(res => setOrders(res.data))
      .catch(() => setMessage('Failed to load orders'));
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {message && <p>{message}</p>}
      {orders.map(order => (
        <div key={order._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1em' }}>
          <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
          <ul>
            {order.products.map(item => (
              <li key={item.product._id}>
                {item.product.name} × {item.quantity}
              </li>
            ))}
          </ul>
          <p>Status: {order.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
