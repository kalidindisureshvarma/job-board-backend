const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  if (req.user.role !== 'company') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const job = await Job.create({ ...req.body, postedBy: req.user.id });
  res.status(201).json(job);
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find().populate('postedBy', 'name');
  res.json(jobs);
};

exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
};

exports.applyJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  if (req.user.role === 'company') {
    return res.status(403).json({ message: 'Company cannot apply for a job' });
  }

  if (job.applicants.includes(req.user.id)) {
    return res.status(400).json({ message: 'You have already applied' });
  }

  job.applicants.push(req.user.id);
  await job.save();

  res.status(200).json({ message: 'Application submitted' });
};
