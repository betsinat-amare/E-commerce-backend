import API from '../utils/api';

// Add item to cart (both local and backend)
export async function addItem(dispatch, product, quantity = 1) {
  try {
    await API.post('/cart', { productId: product._id, quantity });
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  } catch (err) {
    console.error('Failed to add item:', err);
    dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
  }
}

// Remove item from cart
export async function removeItem(dispatch, productId) {
  try {
    // Backend should have an endpoint to remove or update cart items; here you can implement accordingly
    // For example, if your backend supports removal with quantity 0:
    await API.post('/cart', { productId, quantity: 0 });
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  } catch (err) {
    console.error('Failed to remove item:', err);
    dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item' });
  }
}

// Update item quantity in cart
export async function updateItemQuantity(dispatch, productId, quantity) {
  try {
    if (quantity <= 0) {
      await removeItem(dispatch, productId);
      return;
    }
    await API.post('/cart', { productId, quantity });
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  } catch (err) {
    console.error('Failed to update quantity:', err);
    dispatch({ type: 'SET_ERROR', payload: 'Failed to update quantity' });
  }
}
