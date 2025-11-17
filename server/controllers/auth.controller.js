import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import errorHandler from './error.controller.js';

const signin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by credentials
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if role matches (if role is specified)
    if (role && user.role !== role) {
      return res.status(401).json({ error: `Invalid role. This account is registered as ${user.role}` });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    // Set token in cookie
    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(500).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const register = async (req, res) => {
  const { name, email, password, passwordConfirm, role = 'user' } = req.body;

  try {
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user with selected role
    const user = new User({ name, email, password, role });
    await user.save();

    return res.status(201).json({
      message: 'Account created successfully. Please sign in.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const signup = async (req, res) => {
  const { name, email, password, passwordConfirm, role = 'user' } = req.body;

  try {
    console.log('Signup request received:', { name, email, role });
    
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user with selected role
    console.log('Creating user with role:', role);
    const user = new User({ 
      name, 
      email, 
      password, 
      role: role || 'user'
    });
    console.log('User object before save:', { name: user.name, email: user.email, role: user.role });
    await user.save();
    console.log('User object after save:', { name: user.name, email: user.email, role: user.role });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    // Set token in cookie
    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: 'Successfully signed out' });
};

export default { signin, signup, register, signout };
