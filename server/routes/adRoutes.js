const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../utils/cloudinaryUpload');
const { validateImageDimensions } = require('../middleware/imageValidation');
const adController = require('../controllers/adController');

// Create Ad with image upload
// Middleware chain: auth -> multer upload -> image validation -> controller
router.post(
  '/create',
  auth,
  upload.single('image'),
  validateImageDimensions,
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 50 })
      .withMessage('Title must be 50 characters or less'),
    body('catchphrase')
      .trim()
      .notEmpty()
      .withMessage('Catchphrase is required')
      .isLength({ max: 75 })
      .withMessage('Catchphrase must be 75 characters or less')
  ],
  adController.createAd
);

// Get all ads for authenticated partner
router.get(
  '/',
  auth,
  [
    query('status')
      .optional()
      .isIn(['draft', 'pending_review', 'approved', 'active', 'paused', 'rejected'])
      .withMessage('Invalid status'),
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],
  adController.getPartnerAds
);

// Get single ad by ID
router.get(
  '/:id',
  auth,
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid ad ID')
  ],
  adController.getAdById
);

// Update ad (title, catchphrase, status only - no image update)
router.put(
  '/:id',
  auth,
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid ad ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Title must be 50 characters or less'),
    body('catchphrase')
      .optional()
      .trim()
      .isLength({ max: 75 })
      .withMessage('Catchphrase must be 75 characters or less'),
    body('status')
      .optional()
      .isIn(['draft', 'pending_review', 'paused'])
      .withMessage('Invalid status')
  ],
  adController.updateAd
);

// Delete ad
router.delete(
  '/:id',
  auth,
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid ad ID')
  ],
  adController.deleteAd
);

// Submit ad for review
router.post(
  '/:id/submit',
  auth,
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid ad ID')
  ],
  adController.submitForReview
);

module.exports = router;
