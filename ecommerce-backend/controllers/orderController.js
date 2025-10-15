import Order from '../models/order.js';
import User from '../models/user.js';
import Product from '../models/product.js';

export const createOrder = async (req, res) => {
  const user = await User.findById(req.user.userId).populate('cart.product');
  if (!user.cart.length) return res.status(400).json({ message: 'Cart is empty' });

  let total = 0;
  user.cart.forEach(item => {
    total += item.product.price * item.quantity;
    item.product.stock -= item.quantity;
    item.product.save();
  });

  const order = new Order({
    user: user._id,
    products: user.cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    })),
    total
  });
  await order.save();

  user.cart = [];
  await user.save();

  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).populate('products.product');
  res.json(orders);
};
