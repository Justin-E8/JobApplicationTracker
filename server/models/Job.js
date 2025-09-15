//Mongoose schema creation
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        required: true
    },
    jobDescription: {
        type: String,
    },
    otherInfo: {
        type: String,
    },
    dateApplied: {
        type: Date,
    },
    salary: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

//Route to fetch all of a users jobs
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

//Allows other files to use the job schema
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;