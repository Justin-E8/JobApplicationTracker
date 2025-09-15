//Creating a route to post jobs: POST /jobs
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        console.log('🧪 Incoming job post:', req.body);
        const {
            company,
            role,
            status,
            jobDescription,
            otherInfo,
            dateApplied,
            salary,
            userId, 
        } = req.body;
      
        if (!userId) {
            return res.status(400).json({ message: 'Missing user ID' });
        }

        const newJob = new Job({
            company,
            role,
            status,
            jobDescription,
            otherInfo,
            dateApplied,
            salary,
            user: userId
        });
        await newJob.save();
        res.status(201).json({ message: 'Job saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message || 'Error saving job' });
    }
});

//Retrieves all the jobs for the specified user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const jobs = await Job.find({ user: userId }); // Only get jobs for this user
        res.status(200).json(jobs);
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ message: 'Server error fetching jobs' });
    }
});

// Route to update the status of a job application
router.put('/:id', async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );
      res.json(updatedJob);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error updating job status' });
    }
  });
  

module.exports = router;