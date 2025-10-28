import React, { useState } from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';
import { removeItem, updateItemQuantity } from '../utils/cartActions';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { items, loading, error } = useCartState();
  const dispatch = useCartDispatch();
  const [updatingProductIds, setUpdatingProductIds] = useState([]);
  const navigate = useNavigate();

  const handleUpdateQuantity = async (productId, newQuantity) => {
    setUpdatingProductIds(ids => [...ids, productId]);
    await updateItemQuantity(dispatch, productId, newQuantity);
    setUpdatingProductIds(ids => ids.filter(id => id !== productId));
  };

  const handleRemove = async (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      setUpdatingProductIds(ids => [...ids, productId]);
      await removeItem(dispatch, productId);
      setUpdatingProductIds(ids => ids.filter(id => id !== productId));
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-12 text-lg">Loading cart...</p>;
  if (error)
    return (
      <p role="alert" className="text-center text-red-600 mt-12 text-lg">
        {error}
      </p>
    );
  if (!items.length)
    return (
      <div className="text-center p-8 text-gray-700">
        <p className="text-xl font-semibold">Your cart is empty.</p>
        {/* Consider adding a decorative SVG or image here */}
      </div>
    );

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>
      <ul className="space-y-6">
        {items.map(({ product, quantity }) => {
          const isUpdating = updatingProductIds.includes(product._id);
          return (
            <li
              key={product._id}
              className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col flex-grow">
                <strong className="text-lg text-gray-900">{product.name}</strong>
                <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>

                <div className="flex items-center mt-3 space-x-2">
                  <label htmlFor={`qty-${product._id}`} className="sr-only">
                    Quantity of {product.name}
                  </label>
                  <button
                    aria-label={`Decrease quantity of ${product.name}`}
                    onClick={() => handleUpdateQuantity(product._id, quantity - 1)}
                    disabled={quantity <= 1 || isUpdating}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                  >
                    –
                  </button>
                  <span
                    id={`qty-${product._id}`}
                    aria-live="polite"
                    className="w-8 text-center text-gray-800 font-medium"
                  >
                    {quantity}
                  </span>
                  <button
                    aria-label={`Increase quantity of ${product.name}`}
                    onClick={() => handleUpdateQuantity(product._id, quantity + 1)}
                    disabled={isUpdating}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleRemove(product._id)}
                    disabled={isUpdating}
                    aria-label={`Remove ${product.name} from cart`}
                    className="ml-auto text-red-600 hover:text-red-800 disabled:opacity-50 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>

                {isUpdating && (
                  <small className="text-gray-500 mt-1">Updating...</small>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="font-bold text-xl mt-8 text-right text-gray-900">
        Total: ${total.toFixed(2)}
      </p>

      {items.length > 0 && (
        <button
          onClick={() => navigate('/checkout')}
          className="mt-6 w-full bg-gray-900 text-white py-3 text-lg rounded-md hover:bg-gray-800 transition-colors"
        >
          Order Now / Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
