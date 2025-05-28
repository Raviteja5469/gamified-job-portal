const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    min: 0,
  },
  type: { // e.g., 'daily', 'one-time', 'referral', 'action'
    type: String,
    enum: ['daily', 'one-time', 'referral', 'action'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);