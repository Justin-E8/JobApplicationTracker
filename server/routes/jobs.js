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

module.exports = router;