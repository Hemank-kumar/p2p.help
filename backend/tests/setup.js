// Test setup file
const mongoose = require('mongoose');

// Increase timeout for database operations
jest.setTimeout(10000);

// Global test setup
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET_KEY = 'test-secret-key';
  process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/p2p_test';
});

// Global test cleanup
afterAll(async () => {
  // Clean up any remaining database connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
