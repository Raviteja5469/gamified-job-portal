const mongoose = require('mongoose');

const pointsTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    required: true,
    // Can be positive for gains, negative for deductions
  },
  type: { // e.g., 'Job Application', 'Profile Completion', 'Daily Login', 'Referral Bonus'
    type: String,
    required: true,
    trim: true,
  },
  relatedEntity: { // Optional: Link to the specific job, task, or user involved
    id: mongoose.Schema.Types.ObjectId,
    model: String, // e.g., 'Job', 'Task', 'User'
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PointsTransaction', pointsTransactionSchema);