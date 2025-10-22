import User from '../models/User.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ name: user.name, email: user.email });
};

export const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.name = name;
  user.email = email;
  await user.save();
  res.json({ message: 'Profile updated' });
};
