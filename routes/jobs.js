const express = require('express');
const { Job } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a job (admin only)
router.post('/create', [
  authMiddleware,
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('contract').notEmpty().withMessage('Contract type is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('description').notEmpty().withMessage('Description is required'),
], async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { companyName, position, contract, location, description } = req.body;

  try {
    const job = await Job.create({ companyName, position, contract, location, description });
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a job (admin only)
router.put('/:id', [
  authMiddleware,
  body('companyName').optional().notEmpty().withMessage('Company name must not be empty'),
  body('position').optional().notEmpty().withMessage('Position must not be empty'),
  body('contract').optional().notEmpty().withMessage('Contract type must not be empty'),
  body('location').optional().notEmpty().withMessage('Location must not be empty'),
  body('description').optional().notEmpty().withMessage('Description must not be empty'),
], async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { companyName, position, contract, location, description } = req.body;

  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.companyName = companyName || job.companyName;
    job.position = position || job.position;
    job.contract = contract || job.contract;
    job.location = location || job.location;
    job.description = description || job.description;

    await job.save();
    res.status(200).json(job);
  } catch (error) {
    console.error('Error updating job:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await job.destroy();
    res.status(200).json({ message: 'Job deleted' });
  } catch (error) {
    console.error('Error deleting job:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
