const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitApplication,
  getApplicationStatus,
  getAllApplications
} = require('../controllers/applicationController');

// Validation middleware
const validateApplication = [
  body('businessCategory').notEmpty().withMessage('Business category is required'),
  body('legalBusinessName').notEmpty().withMessage('Legal business name is required'),
  body('ein').matches(/^\d{2}-?\d{7}$/).withMessage('Valid EIN is required (XX-XXXXXXX format)'),
  body('street').notEmpty().withMessage('Street address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('zipCode').matches(/^\d{5}(-\d{4})?$/).withMessage('Valid ZIP code is required'),
  body('contactFirstName').notEmpty().withMessage('First name is required'),
  body('contactLastName').notEmpty().withMessage('Last name is required'),
  body('contactEmail').isEmail().withMessage('Valid email is required'),
  body('contactPhone').notEmpty().withMessage('Phone number is required'),
  body('contactTitle').notEmpty().withMessage('Job title is required'),
  body('locationCount').isIn(['single', 'multi-small', 'multi-large']).withMessage('Valid location count is required'),
  body('tier').isIn(['dfw', 'statewide', 'nationwide']).withMessage('Valid tier is required'),
  body('agreeToTerms').custom(value => value === true || value === 'true').withMessage('You must agree to the terms')
];

// Routes
router.post('/submit', validateApplication, submitApplication);
router.get('/:id', getApplicationStatus);
router.get('/', getAllApplications); // TODO: Add admin auth middleware

module.exports = router;
