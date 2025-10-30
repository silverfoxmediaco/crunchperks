const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  // Partner Reference
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true
  },

  // Ad Content
  title: {
    type: String,
    required: true,
    maxlength: 50
  },
  catchphrase: {
    type: String,
    required: true,
    maxlength: 75
  },
  imageUrl: {
    type: String,
    required: true
  },

  // Image Metadata
  imageMetadata: {
    width: Number,
    height: Number,
    fileSize: Number,
    format: String,
    cloudinaryPublicId: String,
    cloudinaryUrl: String
  },

  // Ad Status
  status: {
    type: String,
    enum: ['draft', 'pending_review', 'approved', 'active', 'paused', 'rejected'],
    default: 'draft'
  },

  // Moderation
  moderationStatus: {
    type: String,
    enum: ['pending', 'ai_approved', 'ai_flagged', 'manual_approved', 'manual_rejected'],
    default: 'pending'
  },
  moderationNotes: [{
    moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
    note: String,
    reason: String,
    createdAt: { type: Date, default: Date.now }
  }],
  aiModerationResults: {
    labels: [String],
    confidence: Number,
    flagged: Boolean
  },

  // Analytics
  impressions: {
    type: Number,
    default: 0
  },
  rotationsPerDay: {
    type: Number,
    default: 24
  },
  locationImpressions: [{
    locationId: String,
    locationName: String,
    impressions: Number,
    lastUpdated: Date
  }],

  // Scheduling
  startDate: Date,
  endDate: Date,
  isActive: {
    type: Boolean,
    default: false
  },

  // Important Dates
  submittedForReviewAt: Date,
  approvedAt: Date,
  rejectedAt: Date,
  lastActiveAt: Date
}, {
  timestamps: true
});

// Index for efficient queries
adSchema.index({ partnerId: 1, status: 1 });
adSchema.index({ status: 1, submittedForReviewAt: -1 });
adSchema.index({ isActive: 1 });

module.exports = mongoose.model('Ad', adSchema);
