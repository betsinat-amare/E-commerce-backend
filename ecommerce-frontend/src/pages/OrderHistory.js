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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Order History</h2>
      {message && (
        <p className="text-center text-red-600 mb-6">{message}</p>
      )}
      {orders.length === 0 && !message && (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
      {orders.map((order) => (
        <div
          key={order._id}
          className="border-b border-gray-300 mb-6 pb-4"
        >
          <p className="text-sm text-gray-500 mb-2">
            Order Date: {new Date(order.createdAt).toLocaleString()}
          </p>
          <ul className="list-disc list-inside mb-2">
            {order.products.map((item) => (
              <li key={item.product._id} className="text-gray-700">
                {item.product.name} × {item.quantity}
              </li>
            ))}
          </ul>
          <p className="text-indigo-600 font-semibold">
            Status: {order.paymentStatus}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
