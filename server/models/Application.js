const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Step 1: Business Category
  businessCategory: {
    type: String,
    required: true,
    enum: [
      'restaurant', 'health-wellness', 'retail', 'professional-services',
      'automotive', 'home-services', 'beauty-salon', 'entertainment',
      'pet-services', 'education', 'other'
    ]
  },

  // Step 2: Business Information
  legalBusinessName: {
    type: String,
    required: true,
    trim: true
  },
  ein: {
    type: String,
    required: true,
    match: /^\d{2}-?\d{7}$/
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true, match: /^\d{5}(-\d{4})?$/ }
  },

  // Step 3: Contact Information
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    title: { type: String, required: true }
  },

  // Step 4: Location Count
  locationCount: {
    type: String,
    required: true,
    enum: ['single', 'multi-small', 'multi-large']
  },

  // Step 5: Tier Selection
  tier: {
    type: String,
    required: true,
    enum: ['dfw', 'statewide', 'nationwide'],
    default: 'dfw'
  },

  // Step 6: Terms Agreement
  agreedToTerms: {
    type: Boolean,
    required: true,
    default: false
  },
  agreedAt: {
    type: Date
  },

  // Application Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending'
  },

  // Routing Information
  assignedTo: {
    type: String,
    enum: ['area_manager', 'vp_sales'],
    default: function() {
      return this.locationCount === 'single' ? 'area_manager' : 'vp_sales';
    }
  },
  assignedManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  },

  // Review Notes
  reviewNotes: [{
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
    note: String,
    createdAt: { type: Date, default: Date.now }
  }],

  // Payment Information (Stripe)
  stripeCustomerId: String,
  stripePaymentMethodId: String,

  // Partner Account (created after approval)
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner'
  },

  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date,
  approvedAt: Date
}, {
  timestamps: true
});

// Index for efficient queries
applicationSchema.index({ status: 1, submittedAt: -1 });
applicationSchema.index({ 'contact.email': 1 });
applicationSchema.index({ ein: 1 });

module.exports = mongoose.model('Application', applicationSchema);
