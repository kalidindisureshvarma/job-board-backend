const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'company', 'job_seeker'],
    default: 'job_seeker',
  },
});

module.exports = mongoose.model('User', userSchema);
