// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your User model

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token, or invalid token
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    // Attach user from the database to the request
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password if stored (not in this case, but good practice)
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to check user role for authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role ${req.user ? req.user.role : 'unauthenticated'} is not authorized to access this route` });
    }
    next();
  };
};

module.exports = { protect, authorize };    