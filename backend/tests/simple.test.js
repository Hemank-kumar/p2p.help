const request = require('supertest');
const mongoose = require('mongoose');

// Simple test to verify the testing setup works
describe('P2P.help Basic Tests', () => {
  beforeAll(async () => {
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET_KEY = 'test-secret-key';
    process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/p2p_test';
  });

  afterAll(async () => {
    // Clean up database connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  test('Basic test setup verification', () => {
    expect(true).toBe(true);
  });

  test('Environment variables are set', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.JWT_SECRET_KEY).toBe('test-secret-key');
  });

  test('MongoDB connection string is configured', () => {
    expect(process.env.MONGO_URI).toBeDefined();
    expect(process.env.MONGO_URI).toContain('mongodb://');
  });
});
