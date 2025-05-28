// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Your User model
const jwt = require('jsonwebtoken'); // To generate JWTs

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback', // This should match your frontend redirect
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Validate profile data
          if (!profile.id || !profile.emails || !profile.emails[0]) {
            return done(new Error('Invalid profile data from Google'), null);
          }

          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // Update user's information if needed
            if (user.name !== profile.displayName || user.email !== profile.emails[0].value) {
              user.name = profile.displayName;
              user.email = profile.emails[0].value;
              await user.save();
            }
            return done(null, user);
          }

          // Check if user with same email exists
          const existingUser = await User.findOne({ email: profile.emails[0].value });
          if (existingUser) {
            // Link Google account to existing user
            existingUser.googleId = profile.id;
            existingUser.name = profile.displayName;
            await existingUser.save();
            return done(null, existingUser);
          }

          // Create new user
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'Student' // Default role
          });

          await user.save();
          return done(null, user);
        } catch (err) {
          console.error('Google OAuth Error:', err);
          return done(err, null);
        }
      }
    )
  );

  // Passport serializeUser and deserializeUser are used for session management
  // (though with JWTs, they are less critical for persisting user identity directly)
  // For standard Passport usage with sessions:
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};