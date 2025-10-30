const Ad = require('../models/Ad');
const Partner = require('../models/Partner');
const cloudinary = require('../config/cloudinary');

// Create new ad with image upload
exports.createAd = async (req, res) => {
  try {
    const { title, catchphrase } = req.body;
    const partnerId = req.user._id;

    // Validate required fields
    if (!title || !catchphrase) {
      // If file was uploaded, clean it up
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }

      return res.status(400).json({
        success: false,
        message: 'Title and catchphrase are required'
      });
    }

    // Validate title length
    if (title.length > 50) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }

      return res.status(400).json({
        success: false,
        message: 'Title must be 50 characters or less'
      });
    }

    // Validate catchphrase length
    if (catchphrase.length > 75) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }

      return res.status(400).json({
        success: false,
        message: 'Catchphrase must be 75 characters or less'
      });
    }

    // Image validation already happened in middleware
    // req.file contains the uploaded image info from Cloudinary
    const imageUrl = req.file.path; // Cloudinary URL
    const cloudinaryPublicId = req.file.filename; // Cloudinary public_id

    // Create ad in database
    const ad = await Ad.create({
      partnerId,
      title,
      catchphrase,
      imageUrl,
      imageMetadata: {
        width: 1920,
        height: 1080,
        fileSize: req.file.size,
        format: req.file.format,
        cloudinaryPublicId: cloudinaryPublicId,
        cloudinaryUrl: imageUrl
      },
      status: 'draft',
      moderationStatus: 'pending'
    });

    res.status(201).json({
      success: true,
      data: {
        ad: {
          id: ad._id,
          title: ad.title,
          catchphrase: ad.catchphrase,
          imageUrl: ad.imageUrl,
          status: ad.status,
          createdAt: ad.createdAt
        }
      },
      message: 'Ad created successfully'
    });
  } catch (error) {
    console.error('Create ad error:', error);

    // Clean up uploaded file if ad creation failed
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cleanupError) {
        console.error('Error cleaning up image after failed ad creation:', cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create ad. Please try again.'
    });
  }
};

// Get all ads for the authenticated partner
exports.getPartnerAds = async (req, res) => {
  try {
    const partnerId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { partnerId };

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const ads = await Ad.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Ad.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        ads,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get partner ads error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ads. Please try again.'
    });
  }
};

// Get single ad by ID
exports.getAdById = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = req.user._id;

    const ad = await Ad.findOne({ _id: id, partnerId });

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { ad }
    });
  } catch (error) {
    console.error('Get ad by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ad. Please try again.'
    });
  }
};

// Update ad (title and catchphrase only, not image)
exports.updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = req.user._id;
    const { title, catchphrase, status } = req.body;

    const ad = await Ad.findOne({ _id: id, partnerId });

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      });
    }

    // Only allow updates if ad is in draft or paused status
    if (!['draft', 'paused'].includes(ad.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit ad in current status. Only draft or paused ads can be edited.'
      });
    }

    // Update fields
    if (title) {
      if (title.length > 50) {
        return res.status(400).json({
          success: false,
          message: 'Title must be 50 characters or less'
        });
      }
      ad.title = title;
    }

    if (catchphrase) {
      if (catchphrase.length > 75) {
        return res.status(400).json({
          success: false,
          message: 'Catchphrase must be 75 characters or less'
        });
      }
      ad.catchphrase = catchphrase;
    }

    if (status && ['draft', 'pending_review', 'paused'].includes(status)) {
      ad.status = status;

      if (status === 'pending_review') {
        ad.submittedForReviewAt = new Date();
      }
    }

    await ad.save();

    res.status(200).json({
      success: true,
      data: { ad },
      message: 'Ad updated successfully'
    });
  } catch (error) {
    console.error('Update ad error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update ad. Please try again.'
    });
  }
};

// Delete ad and its image from Cloudinary
exports.deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = req.user._id;

    const ad = await Ad.findOne({ _id: id, partnerId });

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      });
    }

    // Don't allow deletion of active ads
    if (ad.status === 'active') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete an active ad. Please pause it first.'
      });
    }

    // Delete image from Cloudinary
    if (ad.imageMetadata && ad.imageMetadata.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(ad.imageMetadata.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
        // Continue with ad deletion even if Cloudinary deletion fails
      }
    }

    // Delete ad from database
    await Ad.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Ad deleted successfully'
    });
  } catch (error) {
    console.error('Delete ad error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete ad. Please try again.'
    });
  }
};

// Submit ad for review
exports.submitForReview = async (req, res) => {
  try {
    const { id } = req.params;
    const partnerId = req.user._id;

    const ad = await Ad.findOne({ _id: id, partnerId });

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: 'Ad not found'
      });
    }

    if (ad.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only draft ads can be submitted for review'
      });
    }

    ad.status = 'pending_review';
    ad.submittedForReviewAt = new Date();

    await ad.save();

    res.status(200).json({
      success: true,
      data: { ad },
      message: 'Ad submitted for review successfully'
    });
  } catch (error) {
    console.error('Submit for review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit ad for review. Please try again.'
    });
  }
};
