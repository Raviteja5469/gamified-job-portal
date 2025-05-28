// index.js (or server.js)
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Load Passport configuration
require('./config/passport')(passport);

const app = express();

// Connect to MongoDB
connectDB(); //

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express session middleware (for Passport.js internal session management)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Add this before your routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Use authentication routes
app.use('/api/auth', authRoutes); // <--- Add this line

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Gamified Job Portal API' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));