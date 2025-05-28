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
  passport.authenticate('google', { 
    failureRedirect: process.env.FRONTEND_URL + '/login',
    failureMessage: true
  }),
  async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        console.error('No user found after Google authentication');
        return res.redirect(process.env.FRONTEND_URL + '/login?error=no_user');
      }

      // Get role from query parameter
      const role = req.query.role || 'Student';

      // Update user's role
      user.role = role;
      await user.save();

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
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
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect(process.env.FRONTEND_URL + '/login?error=server_error');
    }
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
// @desc    Set user role before Google authentication
// @access  Public
router.post('/set_role', (req, res) => {
  const { role } = req.body;
  if (!role || !['Student', 'Recruiter', 'Admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided' });
  }
  
  // Store role in session
  req.session.role = role;
  res.json({ message: 'Role set successfully' });
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