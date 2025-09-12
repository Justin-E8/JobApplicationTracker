require('dotenv').config();


const jobRoutes = require('./routes/jobs');//Imports router
const authRoutes = require('./routes/auth');



const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Job Tracker API is running!');
  });


  app.use('/jobs', jobRoutes); //redirects to the jobs router
  app.use('/api', authRoutes); //redirects to the authentication router

  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

  const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
  
