const request = require('supertest');
const { server, app } = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');

let token;

beforeAll(async () => {
  await User.deleteMany();
  await Job.deleteMany();
});

describe('🔐 Authentication Tests', () => {
  it('Should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'job_seeker',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('Should not allow duplicate registration', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'job_seeker',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('Should login and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    token = res.body.token;
  });

  it('Should fail login with wrong credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});

afterAll(async () => {
  await Job.deleteMany();
  await User.deleteMany();
  await mongoose.connection.close();
  server.close();
});
