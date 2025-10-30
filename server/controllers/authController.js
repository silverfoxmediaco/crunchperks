const Partner = require('../models/Partner');
const Application = require('../models/Application');
const { generateToken } = require('../utils/jwt');

// Partner Login
exports.partnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find partner by email (explicitly select password field)
    const partner = await Partner.findOne({ email }).select('+password');

    if (!partner) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await partner.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (partner.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support at support@crunchperks.com'
      });
    }

    if (partner.status === 'cancelled') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been cancelled. Please contact support to reactivate.'
      });
    }

    // Update last login timestamp
    partner.lastLoginAt = new Date();
    await partner.save();

    // Generate JWT token
    const token = generateToken({
      id: partner._id,
      email: partner.email
    });

    // Return token and partner data
    res.status(200).json({
      success: true,
      data: {
        token,
        partner: {
          id: partner._id,
          email: partner.email,
          businessName: partner.businessName,
          tier: partner.tier,
          status: partner.status,
          monthlyFee: partner.monthlyFee
        }
      }
    });
  } catch (error) {
    console.error('Partner login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
};

// Partner Signup (for approved applications)
exports.partnerSignup = async (req, res) => {
  try {
    const { email, password, applicationId } = req.body;

    // Verify application exists and is approved
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found. Please check your application ID.'
      });
    }

    if (application.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Your application has not been approved yet. Please wait for approval before creating an account.'
      });
    }

    // Verify email matches the application
    if (application.contact.email !== email) {
      return res.status(400).json({
        success: false,
        message: 'Email does not match the application. Please use the email from your application.'
      });
    }

    // Check if partner already exists with this email
    const existingPartner = await Partner.findOne({ email });

    if (existingPartner) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists. Please log in instead.'
      });
    }

    // Check if partner already exists for this application
    const existingPartnerByApp = await Partner.findOne({ applicationId });

    if (existingPartnerByApp) {
      return res.status(400).json({
        success: false,
        message: 'An account has already been created for this application. Please log in instead.'
      });
    }

    // Create partner account with data from application
    const partner = await Partner.create({
      businessName: application.legalBusinessName,
      ein: application.ein,
      email: email,
      password: password, // Will be hashed by pre-save hook
      status: 'active',
      tier: application.tier,
      monthlyFee: getTierPrice(application.tier),
      stripeCustomerId: application.stripeCustomerId || null,
      applicationId: application._id,
      approvedAt: new Date(),
      totalImpressions: 0,
      membershipCodes: []
    });

    // Generate JWT token
    const token = generateToken({
      id: partner._id,
      email: partner.email
    });

    // Return token and partner data
    res.status(201).json({
      success: true,
      data: {
        token,
        partner: {
          id: partner._id,
          email: partner.email,
          businessName: partner.businessName,
          tier: partner.tier,
          status: partner.status,
          monthlyFee: partner.monthlyFee
        }
      }
    });
  } catch (error) {
    console.error('Partner signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Account creation failed. Please try again.'
    });
  }
};

// Get current partner info
exports.getMe = async (req, res) => {
  try {
    // Partner is already attached to req.user by auth middleware
    res.status(200).json({
      success: true,
      data: {
        partner: {
          id: req.user._id,
          email: req.user.email,
          businessName: req.user.businessName,
          tier: req.user.tier,
          status: req.user.status,
          monthlyFee: req.user.monthlyFee,
          totalImpressions: req.user.totalImpressions
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partner information.'
    });
  }
};

// Helper function to get tier pricing
function getTierPrice(tier) {
  const pricing = {
    dfw: 160,
    statewide: 320,
    nationwide: 640
  };
  return pricing[tier] || 160;
}
