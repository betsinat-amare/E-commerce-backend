import express from 'express';
import { register, login } from '../controllers/authController.js';
import auth from './middleware/auth.js';
app.get('/api/private', auth, (req, res) => {
  res.send('This is a protected route');
});


const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
