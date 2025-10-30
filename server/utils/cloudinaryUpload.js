const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'crunch-perks/ads', // Store in dedicated folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed image formats
    transformation: [{ quality: 'auto', fetch_format: 'auto' }] // Optimize on upload
  }
});

// Configure multer with file size limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Check file mimetype
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.'), false);
    }
  }
});

module.exports = upload;
