//Creating a route to post jobs: POST /jobs
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.post('/', async (req, res) => {
    try {
        const job = new Job(req.body); //Use request data to create a new job
        const savedJob = await job.save(); //Saves the job to MongoDB
        res.status(201).json(savedJob); //Return the saved job
    }catch (err) {
        res.status(400).json({ error: err.message }); //Handles errors
    }
});

module.exports = router;