require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');
const adRoutes = require('./routes/adRoutes');

app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);

// Log registered routes in development
if (process.env.NODE_ENV !== 'production') {
  console.log('📍 Registered API routes:');
  console.log('  - /api/applications');
  console.log('  - /api/auth');
  console.log('  - /api/ads');
}

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Crunch Perks API is running',
    timestamp: new Date().toISOString()
  });
});

// Error Handler (must come before catch-all route)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  // 404 handler for API routes that don't match
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'API route not found'
    });
  });

  // Handle React routing - return index.html for all non-API routes
  // This must be last - it catches all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
} else {
  // 404 Handler for development (API only)
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
