const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');

let companyToken, seekerToken, adminToken, jobId;

beforeAll(async () => {
  await Job.deleteMany();
  await User.deleteMany();

  const adminRes = await request(app).post('/api/auth/register').send({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  });
  adminToken = adminRes.body.token;

  const companyRes = await request(app).post('/api/auth/register').send({
    name: 'Google Inc.',
    email: 'google@example.com',
    password: 'password123',
    role: 'company',
  });
  companyToken = companyRes.body.token;

  const seekerRes = await request(app).post('/api/auth/register').send({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'job_seeker',
  });
  seekerToken = seekerRes.body.token;
});

describe('Job CRUD and Permissions Tests', () => {
  it('Company should post a job', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${companyToken}`)
      .send({
        title: 'Software Engineer',
        description: 'Develop and maintain web apps.',
        company: 'Google Inc.',
        salary: 120000,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Software Engineer');
    jobId = res.body._id;
  });

  it('Job Seeker should not be able to post a job', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${seekerToken}`)
      .send({
        title: 'Data Analyst',
        description: 'Analyze data trends.',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Access denied');
  });

  it('Should fetch all jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('Should get job details', async () => {
    const res = await request(app).get(`/api/jobs/${jobId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Software Engineer');
  });

  it('Job Seeker should apply for a job', async () => {
    const res = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${seekerToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Application submitted');
  });

  it('Company should not apply for a job', async () => {
    const res = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${companyToken}`);

    expect(res.statusCode).toBe(403);
  });
});

afterAll(async () => {
  await Job.deleteMany();
  await User.deleteMany();
  await mongoose.connection.close();
  server.close();
});


