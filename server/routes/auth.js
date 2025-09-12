const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

//Defining the sign up POST route
router.post('/signup', async (req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body;

        //Ensures an email of valid format is given
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        //Ensures a password of length 8 is given
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }
          

        //Encrypts the given password to keep it secure
        const hashedPassword = await bcrypt.hash(password, 10);
        //Creates a new user based on the info submitted
        
        //Checks to see if a user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          });
        await newUser.save();
        res.status(201).json('User Created');
    }catch (err){
        res.status(400).json({ error: err.message });
    }
});

    router.post('/login', async (req, res) => {
        try{
            const { email, password } = req.body;
            //Checks if a user with the given email exists in the database
            const user = await User.findOne({email});
            if (!user) {
                return res.status(401).json({message: 'Email is not registered'})
            }
            //Compares the given password with the encrypted password kept in the database
            const userMatch = await bcrypt.compare(password, user.password);
            if (!userMatch){
                return res.status(401).json({message: 'Password is incorrect'});
            }
            res.status(200).json({message: 'Login successful'});
        }catch(err){
            console.error('Login error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    });

  
module.exports = router;