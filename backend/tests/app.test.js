import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import your app setup
import app from '../index.js';

dotenv.config();

describe('P2P.help Backend API Tests', () => {
  let server;
  let authToken;

  beforeAll(async () => {
    // Start the server
    server = app.listen(0); // Use port 0 to get a random available port
    
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/p2p_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    // Close server and database connection
    if (server) {
      server.close();
    }
    await mongoose.connection.close();
  });

  describe('Health Check', () => {
    test('GET / should return server status', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.text).toBe('Server is running...');
    });
  });

  describe('Admin Authentication', () => {
    test('POST /admin/register should register a new admin', async () => {
      const adminData = {
        name: 'testadmin',
        password: 'testpassword123'
      };

      const response = await request(app)
        .post('/admin/register')
        .send(adminData)
        .expect(201);

      expect(response.body.message).toBe('Admin registered successfully');
    });

    test('POST /admin/login should login admin and return token', async () => {
      const loginData = {
        username: 'testadmin',
        password: 'testpassword123'
      };

      const response = await request(app)
        .post('/admin/login')
        .send(loginData)
        .expect(200);

      expect(response.body.token).toBeDefined();
      authToken = response.body.token;
    });

    test('POST /admin/login should reject invalid credentials', async () => {
      const loginData = {
        username: 'wronguser',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/admin/login')
        .send(loginData)
        .expect(400);

      expect(response.body.error).toBe('Invalid Credentials');
    });
  });

  describe('Course Management', () => {
    let courseId;

    test('POST /courses should create a new course', async () => {
      const courseData = {
        name: 'John Doe',
        email: 'john@example.com',
        mobNumber: 1234567890,
        courseName: 'JavaScript Fundamentals',
        tDurationCourse: '3 months',
        classDays: 'Monday, Wednesday, Friday',
        startTiming: '10:00 AM',
        venue: 'Online',
        durationOfClass: '2 hours',
        noSeats: '30',
        teacherHighQualification: 'MSc Computer Science',
        instAff: 'Tech University',
        department: 'Computer Science',
        prerequisites: 'Basic programming knowledge',
        description: 'Learn JavaScript from scratch'
      };

      const response = await request(app)
        .post('/courses')
        .send(courseData)
        .expect(201);

      expect(response.body.courseName).toBe('JavaScript Fundamentals');
      expect(response.body.email).toBe('john@example.com');
      courseId = response.body._id;
    });

    test('POST /courses should validate required fields', async () => {
      const incompleteData = {
        name: 'John Doe',
        email: 'john@example.com'
        // Missing required fields
      };

      const response = await request(app)
        .post('/courses')
        .send(incompleteData)
        .expect(400);

      expect(response.body.error).toBe('Please fill all the required fields.');
    });

    test('POST /courses should validate email format', async () => {
      const invalidEmailData = {
        name: 'John Doe',
        email: 'invalid-email',
        mobNumber: 1234567890,
        courseName: 'Test Course',
        tDurationCourse: '1 month',
        classDays: 'Monday',
        startTiming: '10:00 AM',
        venue: 'Online',
        prerequisites: 'None'
      };

      const response = await request(app)
        .post('/courses')
        .send(invalidEmailData)
        .expect(400);

      expect(response.body.error).toBe('Please provide a valid email address.');
    });

    test('GET /courses should return all courses', async () => {
      const response = await request(app)
        .get('/courses')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /courses/:id should return specific course', async () => {
      const response = await request(app)
        .get(`/courses/${courseId}`)
        .expect(200);

      expect(response.body._id).toBe(courseId);
      expect(response.body.courseName).toBe('JavaScript Fundamentals');
    });

    test('GET /courses/:id should return 404 for non-existent course', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/courses/${fakeId}`)
        .expect(404);

      expect(response.body.error).toBe('Course not found');
    });

    test('PATCH /courses/:id should update course (with auth)', async () => {
      const updateData = {
        description: 'Updated course description'
      };

      const response = await request(app)
        .patch(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe('Course updated successfully');
      expect(response.body.course.description).toBe('Updated course description');
    });

    test('PATCH /courses/:id/status should update course status (with auth)', async () => {
      const statusData = {
        status: 'inactive'
      };

      const response = await request(app)
        .patch(`/courses/${courseId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(statusData)
        .expect(200);

      expect(response.body.message).toBe('Course status updated');
      expect(response.body.course.status).toBe('inactive');
    });

    test('DELETE /courses/:id should delete course (with auth)', async () => {
      const response = await request(app)
        .delete(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.message).toBe('Course deleted successfully');
    });
  });

  describe('Contact Form', () => {
    test('POST /contact should submit contact form', async () => {
      const contactData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'I would like to know more about your courses.'
      };

      const response = await request(app)
        .post('/contact')
        .send(contactData)
        .expect(201);

      expect(response.body.message).toBe("Thank You for contacting us. We'll get back to you soon.");
      expect(response.body.success).toBe(true);
    });

    test('POST /contact should validate required fields', async () => {
      const incompleteData = {
        name: 'Jane Smith'
        // Missing email and message
      };

      const response = await request(app)
        .post('/contact')
        .send(incompleteData)
        .expect(404);

      expect(response.body.error).toBe('Please fill name, email and message');
    });

    test('POST /contact should validate email format', async () => {
      const invalidEmailData = {
        name: 'Jane Smith',
        email: 'invalid-email',
        message: 'Test message'
      };

      const response = await request(app)
        .post('/contact')
        .send(invalidEmailData)
        .expect(400);

      expect(response.body.error).toBe('Please provide a valid email address');
    });
  });

  describe('Course Registration', () => {
    let testCourseId;

    beforeAll(async () => {
      // Create a test course for registration
      const courseData = {
        name: 'Test Teacher',
        email: 'teacher@example.com',
        mobNumber: 9876543210,
        courseName: 'Python Programming',
        tDurationCourse: '2 months',
        classDays: 'Tuesday, Thursday',
        startTiming: '2:00 PM',
        venue: 'Online',
        prerequisites: 'Basic programming knowledge'
      };

      const response = await request(app)
        .post('/courses')
        .send(courseData);
      
      testCourseId = response.body._id;
    });

    test('POST /registration should register for a course', async () => {
      const registrationData = {
        fullName: 'Student Name',
        email: 'student@example.com',
        mobileNumber: '9876543210',
        courseName: 'Python Programming',
        highestEducation: 'Bachelor',
        profession: 'Student',
        institute: 'University',
        reasonForJoining: 'Career development',
        additionalSkills: 'Basic programming',
        learningPreferences: 'Hands-on learning'
      };

      const response = await request(app)
        .post('/registration')
        .send(registrationData)
        .expect(201);

      expect(response.body.message).toBe('Registration successful!');
    });

    test('POST /registration should validate required fields', async () => {
      const incompleteData = {
        fullName: 'Student Name'
        // Missing required fields
      };

      const response = await request(app)
        .post('/registration')
        .send(incompleteData)
        .expect(400);

      expect(response.body.error).toBe('Fill all required fields');
    });

    test('POST /registration should return 404 for non-existent course', async () => {
      const registrationData = {
        fullName: 'Student Name',
        email: 'student2@example.com',
        mobileNumber: '9876543211',
        courseName: 'Non-existent Course'
      };

      const response = await request(app)
        .post('/registration')
        .send(registrationData)
        .expect(404);

      expect(response.body.error).toBe('Course not found');
    });

    afterAll(async () => {
      // Clean up test course
      if (testCourseId) {
        await request(app)
          .delete(`/courses/${testCourseId}`)
          .set('Authorization', `Bearer ${authToken}`);
      }
    });
  });

  describe('Error Handling', () => {
    test('Should handle invalid routes', async () => {
      const response = await request(app)
        .get('/invalid-route')
        .expect(404);
    });

    test('Should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/contact')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);
    });
  });
});
