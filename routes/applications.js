const express = require('express');
const { Application, Job, User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { validationResult, check } = require('express-validator');

// Apply for a job
router.post('/apply', [
  authMiddleware,
  check('jobId').isInt().withMessage('Invalid job ID')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jobId } = req.body;
  const userId = req.user.id;

  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({ where: { jobId, userId } });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    const application = await Application.create({ jobId, userId });
    res.status(201).json(application);
  } catch (error) {
    console.error('Failed to process application:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications for the current user
router.get('/my-applications', authMiddleware, async (req, res) => {
  console.log('GET request received at /my-applications');
  try {
    const userId = req.user.id;
    const applications = await Application.findAll({ where: { userId }, include: Job });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Failed to fetch applications:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
