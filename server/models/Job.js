const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  recruiter: { // ID of the recruiter who posted the job
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applicants: [ // Array of user IDs who applied to this job
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  postedDate: {
    type: Date,
    default: Date.now,
  },
  status: { // e.g., 'active', 'closed', 'pending_approval'
    type: String,
    enum: ['active', 'closed', 'pending_approval'],
    default: 'active',
  },
});

module.exports = mongoose.model('Job', jobSchema);