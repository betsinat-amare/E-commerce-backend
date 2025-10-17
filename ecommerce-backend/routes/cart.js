import express from 'express';
import Cart from '../models/cart.js';
import Product from '../models/product.js';
import { authMiddleware } from '../middleware/auth.js'; 

const router = express.Router();

// Get cart for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json({ items: cart ? cart.items : [] });
});

// Add item to cart
router.post('/', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }
  const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  res.json({ success: true });
});

export default router;
