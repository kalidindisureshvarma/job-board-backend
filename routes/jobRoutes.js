const express = require('express');
const {
  createJob,
  getJobs,
  getJobById,
  applyJob,
} = require('../controllers/jobController');
const protect = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', protect, applyJob);

module.exports = router;
