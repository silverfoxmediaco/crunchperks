require('dotenv').config();
const mongoose = require('mongoose');
const Application = require('./server/models/Application');

async function approveApplication() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find and update the application
    const applicationId = '6900D50BF7434329449006A8';
    const application = await Application.findByIdAndUpdate(
      applicationId,
      {
        status: 'approved'
      },
      { new: true }
    );

    if (application) {
      console.log('✅ Application approved successfully!');
      console.log('Application ID:', application._id);
      console.log('Business Name:', application.legalBusinessName);
      console.log('Email:', application.contact.email);
      console.log('Status:', application.status);
      console.log('\nYou can now create a partner account at:');
      console.log('http://localhost:3000/partner/create-account');
      console.log('\nUse these credentials:');
      console.log('Email: john.smith@testrestaurant.com');
      console.log('Password: TestPassword123');
      console.log('Application ID:', applicationId);
    } else {
      console.log('❌ Application not found');
    }

    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

approveApplication();
