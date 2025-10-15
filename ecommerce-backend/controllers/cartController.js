import User from '../models/user.js';
import Product from '../models/product.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user.userId);
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const cartItem = user.cart.find(item => item.product.equals(productId));
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }
  await user.save();
  res.json(user.cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.userId);
  user.cart = user.cart.filter(item => !item.product.equals(productId));
  await user.save();
  res.json(user.cart);
};

export const getCart = async (req, res) => {
  const user = await User.findById(req.user.userId).populate('cart.product');
  res.json(user.cart);
};
