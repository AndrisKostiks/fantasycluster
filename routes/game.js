const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdministrator } = require('../config/auth');
const Player = require('../models/Player');
const User = require('../models/User');
const Mob = require('../models/Mob');
const mongoose = require('mongoose');

router.get('/', ensureAuthenticated, (req, res) => {
    const player_id = req.query.player_id;
    const user_id = req.query.user_id;

    let userPromise = User.findById(user_id).exec();
    let playerPromise = Player.findById(player_id).exec();
    userPromise.then(user => {
        playerPromise.then((player) => {
            res.render('main', {
                user,
                player,
            });
        });
    });
});
router.get('/fight', ensureAuthenticated, (req, res) => {
    let player_id = req.query.id;
    Mob.aggregate([{ $sample: { size: 1 } }], (err, mobs) =>{
        mobs.forEach(mob => {
            
            // mob.img.replace('/assets', ' ');
            mob.img = mob.img.replace('assets', '.');
            console.log(mob.img);
            let playerPromise = Player.findById(player_id).exec();
            playerPromise.then((player) => {
                res.render('fight', {
                    user: req.user,
                    player,
                    mob,
                });
            });
        });
    });
        
    
});

module.exports = router;