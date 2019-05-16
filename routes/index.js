const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdministrator } = require('../config/auth');
const Player = require('../models/Player');
const User = require('../models/User');
const mongoose = require('mongoose');

// WELCOME PAGE
router.get('/', (req, res) => res.render('welcome'));
// DASHBOARD
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
    if(typeof req.user.usersPlayers !== 'undefined' && req.user.usersPlayers.length > 0) {
        let players = [];
        Player.find({}, (err,docs) => {
            docs.forEach(element => {
                players.push(element);
            });

            res.render('dashboard', {
                user: req.user,
                players: players,
            });
        });
    } else {
        res.render('dashboard', { extractScripts: true }, {
            user: req.user,
            players: players,
        });
    }
});
// PLAYER CREATION HANDLER
router.post('/dashboard', ensureAuthenticated, (req, res) => {
    const { uname, name, pclass } = req.body;
    let errors = [];
    const newPlayer = new Player({
        _id: new mongoose.Types.ObjectId(),
        name,
        pclass,
        playersUser: uname
    });
    const newUser = User.findById( newPlayer.playersUser, (err, adventure) =>{
        adventure.usersPlayers.push(newPlayer);
        adventure.save();
    });
    
    newPlayer.save()
        .then(user => {
            req.flash('success_msg','You Have Created a New Player! ')
            res.redirect('/dashboard');
        })
        .catch(err => console.log(err));
});


module.exports = router;
