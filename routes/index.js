const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated,
    ensureAdministrator
} = require('../config/auth');
const Player = require('../models/Player');
const User = require('../models/User');
const Stats = require('../models/Stats');
const Inventory = require('../models/Inventory');
const Equipment = require('../models/Equipment');
const Class = require('../models/Class');
const QuestLog = require('../models/QuestLog');
const mongoose = require('mongoose');

// WELCOME PAGE
router.get('/', (req, res) => res.render('welcome'));
// DASHBOARD
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    if (typeof req.user.usersPlayers !== 'undefined' && req.user.usersPlayers.length > 0) {
        let players = [];
        let stats = [];
        let classes = [];
        Player.find({ playersUser: req.user._id }, (err, docs) => {
            docs.forEach(player => {
                players.push(player);
            });
            Stats.find({}, (err, docs) => {
                docs.forEach(stat => {
                    stats.push(stat);
                });
                Class.find({}, (err, docs) => {
                    docs.forEach(element => {
                        classes.push(element);
                    });
                    res.render('dashboard', {
                        user: req.user,
                        stats,
                        players,
                        classes,
                    });
                });
            });
        });
    } else {
        let classes = [];
        Class.find({}, (err, docs) => {
            docs.forEach(element => {
                classes.push(element);
            });
            res.render('dashboard', {
                user: req.user,
                classes,
            });
        });
    }
});
// PLAYER CREATION HANDLER
router.post('/dashboard', ensureAuthenticated, (req, res) => {
    const {
        uname,
        name,
        pclass
    } = req.body;
    let errors = [];
    let pl_id = new mongoose.Types.ObjectId();
    let ql_id = new mongoose.Types.ObjectId();
    let eq_id = new mongoose.Types.ObjectId();
    let inv_id = new mongoose.Types.ObjectId();
    let stats_id = new mongoose.Types.ObjectId();
    let curclass = [];
    Class.find({ name: pclass }, (err, docs) => {
        docs.forEach(element => {
            curclass.push(element);
        });
        curclass.forEach(element => {
            const ql = new QuestLog({
                _id: ql_id,
                belongsTo: pl_id,
            });
            const eq = new Equipment({
                _id: eq_id,
                belongsTo: pl_id,
            });
            const inv = new Inventory({
                _id: inv_id,
                belongsTo: pl_id,
            });
            const stats = new Stats({
                _id: stats_id,
                strength: element.stats.get("Strength"),
                agility: element.stats.get("Agility"),
                intellegence: element.stats.get("Intellegence"),
                wisdom: element.stats.get("Wisdom"),
                luck: element.stats.get("Luck"),
                belongsTo: pl_id,
            });
            const newPlayer = new Player({
                _id: pl_id,
                name,
                playersClass: element._id,
                playersQL: ql,
                playersEquipment: eq,
                playersInventory: inv,
                playersStats: stats,
                playersUser: uname,
            });
            ql.save();
            eq.save();
            inv.save();
            stats.save();
            const newUser = User.findById(newPlayer.playersUser, (err, adventure) => {
                adventure.usersPlayers.push(newPlayer);
                adventure.save();
            });
            newPlayer.save()
                .then(user => {
                    req.flash('success_msg', 'You Have Created a New Player! ')
                    res.redirect('/dashboard');
                })
                .catch(err => console.log(err));
        });
    });
});
// PLAYER DELETION HANDLER
router.post('/delete_player', ensureAuthenticated, (req, res) => {
    const player = req.body.player_delete_id;
    Inventory.findOneAndRemove({ 'belongsTo': player }, (err, docs) => {
        
    });
    QuestLog.findOneAndRemove({ 'belongsTo': player }, (err, docs) => {
        
    });
    Equipment.findOneAndRemove({ 'belongsTo': player }, (err, docs) => {
        
    });
    Stats.findOneAndRemove({ 'belongsTo': player }, (err, docs) => {
        
    });
    Player.findOneAndRemove({ '_id': player }, (err, docs) => {
        
    }).then(user => {
        req.flash('success_msg', 'You Have Deleted a Player! ')
        res.redirect('/dashboard');
    })
    .catch(err => console.log(err));

    
});


module.exports = router;