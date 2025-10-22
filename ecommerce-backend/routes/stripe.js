// routes/stripe.js
import express from 'express';
import Stripe from 'stripe';
import { authMiddleware as auth } from '../middleware/auth.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', auth, async (req, res) => {
  const { items, shipping } = req.body;
  try {
    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.product.name },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/checkout-cancel',
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'ET'] },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

export default router;
