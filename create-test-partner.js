require('dotenv').config();
const mongoose = require('mongoose');
const Partner = require('./server/models/Partner');

async function createTestPartner() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if partner already exists
    const existing = await Partner.findOne({ email: 'john.smith@testrestaurant.com' });
    if (existing) {
      console.log('✅ Test partner already exists!');
      console.log('Email:', existing.email);
      console.log('Business Name:', existing.businessName);
      console.log('Status:', existing.accountStatus);
      await mongoose.connection.close();
      return;
    }

    // Create test partner
    const testPartner = await Partner.create({
      email: 'john.smith@testrestaurant.com',
      password: 'TestPassword123', // Will be hashed by pre-save hook
      businessName: 'Test Restaurant',
      applicationId: '6900D50BF7434329449006A8',
      accountStatus: 'active',
      contactName: 'John Smith',
      phoneNumber: '555-0123'
    });

    console.log('✅ Test partner created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email: john.smith@testrestaurant.com');
    console.log('Password: TestPassword123');
    console.log('\nPartner Details:');
    console.log('ID:', testPartner._id);
    console.log('Business Name:', testPartner.businessName);
    console.log('Status:', testPartner.accountStatus);

    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestPartner();
