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
    }

    
})
    