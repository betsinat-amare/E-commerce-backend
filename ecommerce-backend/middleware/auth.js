// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT payload:', decoded);

    const userId = decoded.id || decoded._id || decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    const user = await User.findById(userId);
    console.log('Found user:', user);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
}
