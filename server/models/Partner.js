const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const partnerSchema = new mongoose.Schema({
  // Business Information
  businessName: {
    type: String,
    required: true
  },
  ein: {
    type: String,
    required: true,
    unique: true
  },

  // Contact & Authentication
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },

  // Account Status
  status: {
    type: String,
    enum: ['active', 'suspended', 'cancelled'],
    default: 'active'
  },

  // Subscription Info
  tier: {
    type: String,
    enum: ['dfw', 'statewide', 'nationwide'],
    required: true
  },
  monthlyFee: {
    type: Number,
    default: 160
  },

  // Stripe Information
  stripeCustomerId: String,
  stripeSubscriptionId: String,

  // Application Reference
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  },

  // Stats
  totalImpressions: {
    type: Number,
    default: 0
  },
  totalAds: {
    type: Number,
    default: 0
  },

  // Membership Benefits
  membershipCodes: [{
    code: String,
    used: { type: Boolean, default: false },
    usedBy: String,
    usedAt: Date
  }],

  // Account Dates
  approvedAt: Date,
  lastLoginAt: Date,
  cancelRequestedAt: Date,
  cancelledAt: Date
}, {
  timestamps: true
});

// Hash password before saving
partnerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
partnerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Index for efficient queries
partnerSchema.index({ email: 1 });
partnerSchema.index({ ein: 1 });
partnerSchema.index({ status: 1 });

module.exports = mongoose.model('Partner', partnerSchema);
