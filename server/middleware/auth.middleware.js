import jwt from 'jsonwebtoken';

// Verify JWT Token
export const requireSignin = (req, res, next) => {
  let token = req.headers.authorization || req.cookies.t;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Handle Bearer token format
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    console.log('Using JWT_SECRET:', jwtSecret);
    console.log('Token:', token.substring(0, 50) + '...');
    
    const decoded = jwt.verify(token, jwtSecret);
    req.auth = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.auth && req.auth.id) {
    next();
  } else {
    res.status(403).json({ error: 'User not authenticated' });
  }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.auth && req.auth.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// Check if user is the owner of the resource or admin
export const isOwnerOrAdmin = (req, res, next) => {
  if (req.auth && (req.auth.id === req.profile._id.toString() || req.auth.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};
