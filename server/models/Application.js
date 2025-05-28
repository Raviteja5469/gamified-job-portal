const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: { // e.g., 'Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Hired'
    type: String,
    enum: ['Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Hired'],
    default: 'Pending',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  // You might add fields like:
  // resumeUrlAtApplication: { type: String }, // snapshot of resume URL
  // coverLetter: { type: String },
});

module.exports = mongoose.model('Application', applicationSchema);