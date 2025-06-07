// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth'); // Import auth middleware
const jwt = require('jsonwebtoken');
const passport = require('passport'); // Needed for Google OAuth routes


// @route   GET /api/auth/google
// @desc    Authenticate with Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL + '/login' }),
  async (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    let redirectPath = '/';
    if (user.role === 'Student') {
      redirectPath = '/student/dashboard';
    } else if (user.role === 'Recruiter') {
      redirectPath = '/recruiter/dashboard';
    } else if (user.role === 'Admin') {
      redirectPath = '/admin/dashboard';
    }
    res.redirect(`${process.env.FRONTEND_URL}${redirectPath}`);
  }
);

// @route   GET /api/auth/current_user
// @desc    Get current logged-in user details
// @access  Private (requires token)
router.get('/current_user', protect, async (req, res) => {
  // req.user is populated by the 'protect' middleware
  const user = await User.findById(req.user._id).select('-googleId -__v');
  res.json({ isAuthenticated: true, user });
});

// @route   POST /api/auth/set_role
// @desc    Set user role after initial login if it's 'Student' (default)
// @access  Private (requires token)
router.post('/set_role', protect, async (req, res) => {
  const { role } = req.body;

  if (!role || !['Student', 'Recruiter', 'Admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided' });
  }

  try {
    const user = await User.findById(req.user._id); // req.user is from the protect middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only allow setting role if it's currently default 'Student' or if admin is changing it.
    // For simplicity, let's assume users can set their own role after initial login.
    // A more robust solution might require admin approval for Recruiter/Admin roles.
    user.role = role;
    await user.save();

    // Re-issue JWT with updated role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: 'Role updated successfully', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during role update' });
  }
});


// @route   GET /api/auth/logout
// @desc    User logout
// @access  Public
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the JWT cookie
  // Passport's req.logout is asynchronous, pass a callback
  req.logout(function(err) {
    if (err) { return next(err); } // Handle errors
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;