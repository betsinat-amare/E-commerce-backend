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

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p role="alert" style={{ color: 'red' }}>{error}</p>;
  if (!items.length)
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Your cart is empty.</p>
        {/* You can add a cart illustration SVG here */}
      </div>
    );

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Your Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(({ product, quantity }) => {
          const isUpdating = updatingProductIds.includes(product._id);
          return (
            <li key={product._id} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
              <img
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                style={{ marginRight: '1rem', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div style={{ flexGrow: 1 }}>
                <strong>{product.name}</strong>
                <p style={{ margin: '0.25rem 0' }}>${product.price.toFixed(2)}</p>

                <div>
                  <label htmlFor={`qty-${product._id}`} style={{ marginRight: '0.5rem' }}>
                    Quantity:
                  </label>
                  <button
                    aria-label={`Decrease quantity of ${product.name}`}
                    onClick={() => handleUpdateQuantity(product._id, quantity - 1)}
                    disabled={quantity <= 1 || isUpdating}
                    style={{ marginRight: '0.5rem' }}
                  >
                    –
                  </button>
                  <span id={`qty-${product._id}`} aria-live="polite" style={{ marginRight: '0.5rem' }}>
                    {quantity}
                  </span>
                  <button
                    aria-label={`Increase quantity of ${product.name}`}
                    onClick={() => handleUpdateQuantity(product._id, quantity + 1)}
                    disabled={isUpdating}
                    style={{ marginRight: '1rem' }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleRemove(product._id)}
                    disabled={isUpdating}
                    aria-label={`Remove ${product.name} from cart`}
                    style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
                {isUpdating && <small>Updating...</small>}
              </div>
            </li>
          );
        })}
      </ul>

      <p style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        Total: ${total.toFixed(2)}
      </p>

      {items.length > 0 && (
        <button
          style={{
            display: 'block',
            width: '100%',
            background: '#222',
            color: '#fff',
            fontSize: '1.1rem',
            padding: '0.75rem',
            marginTop: '1rem',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/checkout')}
        >
          Order Now / Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
