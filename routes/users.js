const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
// User Model
const User = require('../models/User');

// LOGIN
router.get('/login', (req, res) => res.render('login'));
// REGISTER
router.get('/register', (req, res) => res.render('register'));
// REGISTER HANDLE
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check Req Fields
    if (!name || !email || !password || !password2) 
        errors.push({ msg: 'Please Fill in All The Fields' })
    
    // Check If Passwords Match
    if (password !== password2)
        errors.push({ msg: 'Passwords Do Not Match' });
    
    // Check Password Length
    if(password.length < 6)
        errors.push({ msg: 'Password must be at least 6 characters long'})

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation Pass
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User Exists
                    errors.push({ msg: 'Email already registred' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name,
                        email,
                        password
                    });
                    
                    // HASH PASSWORD
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // set password to hashed
                        newUser.password = hash;
                        // save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg','You are now registred! ')
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    }));
                }
            });
    }
    
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// logout handel
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
})
module.exports = router;