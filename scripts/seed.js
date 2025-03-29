const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Job = require('../models/Job');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
    {
      name: 'Google Inc.',
      email: 'google@example.com',
      password: hashedPassword,
      role: 'company',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'job_seeker',
    },
  ];

  await User.insertMany(users);
  console.log('✅ Users seeded');
  return users;
};

const seedJobs = async (companyId) => {
  const jobs = [
    {
      title: 'Software Engineer',
      description: 'Develop and maintain web applications.',
      company: 'Google Inc.',
      salary: 120000,
      postedBy: companyId,
    },
    {
      title: 'Product Manager',
      description: 'Manage product development lifecycle.',
      company: 'Google Inc.',
      salary: 150000,
      postedBy: companyId,
    },
    {
      title: 'UI/UX Designer',
      description: 'Design and enhance user interfaces.',
      company: 'Google Inc.',
      salary: 90000,
      postedBy: companyId,
    },
  ];

  await Job.insertMany(jobs);
  console.log('✅ Jobs seeded');
};

const seedDatabase = async () => {
  await connectDB();
  await User.deleteMany();
  await Job.deleteMany();

  const users = await seedUsers();
  const company = users.find((user) => user.role === 'company');
  if (company) {
    await seedJobs(company._id);
  }

  console.log('🎉 Seeding complete!');
  process.exit();
};

seedDatabase().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
