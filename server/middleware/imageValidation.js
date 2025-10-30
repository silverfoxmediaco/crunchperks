const cloudinary = require('../config/cloudinary');

// Required dimensions for TV display ads
const REQUIRED_WIDTH = 1920;
const REQUIRED_HEIGHT = 1080;

/**
 * Middleware to validate image dimensions after Cloudinary upload
 * This runs AFTER multer/cloudinary upload, so the image is already on Cloudinary
 * If validation fails, we delete the image from Cloudinary and return an error
 */
const validateImageDimensions = async (req, res, next) => {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file provided'
    });
  }

  try {
    // Get image metadata from Cloudinary using the public_id
    const publicId = req.file.filename;

    // Use Cloudinary API to get resource details
    const resource = await cloudinary.api.resource(publicId);

    // Get image dimensions from Cloudinary metadata
    const width = resource.width;
    const height = resource.height;

    // Validate dimensions
    if (width !== REQUIRED_WIDTH || height !== REQUIRED_HEIGHT) {
      // Delete the uploaded image from Cloudinary since it doesn't meet requirements
      await cloudinary.uploader.destroy(publicId);

      return res.status(400).json({
        success: false,
        message: `Image must be exactly ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT} pixels. Your image is ${width}x${height} pixels.`,
        requiredDimensions: {
          width: REQUIRED_WIDTH,
          height: REQUIRED_HEIGHT
        },
        actualDimensions: {
          width: width,
          height: height
        }
      });
    }

    // Image is valid, proceed to next middleware/controller
    next();
  } catch (error) {
    console.error('Image validation error:', error);

    // If there was an error, try to clean up the uploaded file
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cleanupError) {
        console.error('Error cleaning up invalid image:', cleanupError);
      }
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to validate image. Please try again.'
    });
  }
};

module.exports = { validateImageDimensions };
