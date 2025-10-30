const { verifyToken } = require('../utils/jwt');
const Partner = require('../models/Partner');

const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please log in to access this resource.'
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.'
      });
    }

    // Fetch partner from database
    const partner = await Partner.findById(decoded.id).select('-password');

    if (!partner) {
      return res.status(401).json({
        success: false,
        message: 'Partner account not found. Please contact support.'
      });
    }

    // Check if partner account is active
    if (partner.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.'
      });
    }

    if (partner.status === 'cancelled') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been cancelled. Please contact support to reactivate.'
      });
    }

    // Attach partner to request object
    req.user = partner;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed. Please try again.'
    });
  }
};

module.exports = auth;
