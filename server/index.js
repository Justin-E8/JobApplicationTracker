require('dotenv').config();


const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Job Tracker API is running!');
  });
  
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

  const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
  
