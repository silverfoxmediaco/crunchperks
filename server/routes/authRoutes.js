const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Partner Login
router.post(
  '/partner/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.partnerLogin
);

// Partner Signup (for approved applications)
router.post(
  '/partner/signup',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('applicationId').notEmpty().withMessage('Application ID is required')
  ],
  authController.partnerSignup
);

// Get current partner info (protected route)
router.get('/partner/me', auth, authController.getMe);

module.exports = router;
