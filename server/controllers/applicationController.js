const Application = require('../models/Application');
const { validationResult } = require('express-validator');

// @desc    Submit new partner application
// @route   POST /api/applications/submit
// @access  Public
exports.submitApplication = async (req, res) => {
  try {
    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      businessCategory,
      legalBusinessName,
      ein,
      street,
      city,
      state,
      zipCode,
      contactFirstName,
      contactLastName,
      contactEmail,
      contactPhone,
      contactTitle,
      locationCount,
      tier,
      agreeToTerms
    } = req.body;

    // Check if application already exists with this EIN or email
    const existingApplication = await Application.findOne({
      $or: [
        { ein },
        { 'contact.email': contactEmail }
      ]
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this EIN or email already exists'
      });
    }

    // Create application
    const application = await Application.create({
      businessCategory,
      legalBusinessName,
      ein,
      address: {
        street,
        city,
        state,
        zipCode
      },
      contact: {
        firstName: contactFirstName,
        lastName: contactLastName,
        email: contactEmail,
        phone: contactPhone,
        title: contactTitle
      },
      locationCount,
      tier,
      agreedToTerms: agreeToTerms,
      agreedAt: new Date(),
      status: 'pending'
    });

    // TODO: Send email notifications
    // - To applicant: confirmation email
    // - To assigned manager: new application notification

    // AUTO-APPROVE IF ENABLED (FOR TESTING)
    if (process.env.AUTO_APPROVE_APPLICATIONS === 'true') {
      console.log('🔧 Auto-approval enabled: Approving application...');

      // Update application status (but don't create Partner account yet)
      application.status = 'approved';
      application.approvedAt = new Date();
      application.reviewedAt = new Date();
      await application.save();

      console.log('✅ Application auto-approved:', {
        applicationId: application._id,
        email: contactEmail,
        businessName: legalBusinessName
      });
    }

    res.status(201).json({
      success: true,
      message: process.env.AUTO_APPROVE_APPLICATIONS === 'true'
        ? 'Application submitted and auto-approved! Use your Application ID to create your account.'
        : 'Application submitted successfully',
      data: {
        applicationId: application._id,
        status: application.status,
        submittedAt: application.submittedAt,
        assignedTo: application.assignedTo
      }
    });

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// @desc    Get application status
// @route   GET /api/applications/:id
// @access  Public (with application ID)
exports.getApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .select('-reviewNotes -__v');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        status: application.status,
        submittedAt: application.submittedAt,
        businessName: application.legalBusinessName,
        tier: application.tier
      }
    });

  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving application',
      error: error.message
    });
  }
};

// @desc    Get all applications (Admin only)
// @route   GET /api/applications
// @access  Private (Admin)
exports.getAllApplications = async (req, res) => {
  try {
    const { status, assignedTo, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    const applications = await Application.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Application.countDocuments(query);

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving applications',
      error: error.message
    });
  }
};
