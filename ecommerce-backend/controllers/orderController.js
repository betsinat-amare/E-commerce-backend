import User from '../models/User.js';
import Order from '../models/Order.js';   
import Product from '../models/product.js';
export const createOrder = async (req, res) => {
  // Find the user
  const user = await User.findById(req.user.userId).populate('cart.product');

  // Check: Did we actually find a user?
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Then check: Does the user cart have items?
  if (!user.cart.length) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  let total = 0;
  user.cart.forEach(item => {
    total += item.product.price * item.quantity;
    item.product.stock -= item.quantity;
    item.product.save();
  });

  const { shipping, paymentStatus } = req.body;

  const order = new Order({
    user: user._id,
    products: user.cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })),
    shipping,
    paymentStatus: paymentStatus || 'Pending',
    total
  });
  await order.save();

  // Clear user cart after order
  user.cart = [];
  await user.save();

  res.status(201).json(order);
};


export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
