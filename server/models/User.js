const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values, important if you support other auth methods later
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['Student', 'Recruiter', 'Admin'],
    default: 'Student',
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  rank: {
    type: String,
    default: 'Beginner', // You can update this dynamically based on points
  },
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  completedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  resumeUrl: {
    type: String,
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true,
    // Add an index for faster lookup if you expect many users
  },
  referredBy: { // The ID of the user who referred this user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);