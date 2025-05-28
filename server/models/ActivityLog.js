const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: true,
  },
  // Optional: Add a reference to the user who performed the action
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Optional: Add a reference to the entity affected (e.g., job, user)
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  entityType: {
    type: String, // e.g., 'Job', 'User', 'Application'
  },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);