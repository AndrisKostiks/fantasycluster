const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdministrator } = require('../config/auth');
const Player = require('../models/Player');
const Mob = require('../models/Mob');
const User = require('../models/User');
const Location = require('../models/Location');
const Item = require('../models/Item');
const Quest = require('../models/Quest');
const Class = require('../models/Class');
const Log = require('../models/Log');
const upload = require('../config/upload');
const mongoose = require('mongoose');

// ADMIN PANEL VIEW
router.get('/admin_panel', ensureAuthenticated, (req, res) => {
    let users = [];
    let mobs = [];
    let quests = [];
    let locations = [];
    let logs = [];
    let items = [];
    let classes = [];
    if (ensureAdministrator(req.user) === true) {
        User.find({}, (err,docs) => {
            docs.forEach(element => {
                users.push(element);
            });
            Mob.find({}, (err,docs) => {
                docs.forEach(element => {
                    mobs.push(element);
                });
                    Quest.find({}, (err,docs) => {
                        docs.forEach(element => {
                            quests.push(element);
                        });
                        Location.find({}, (err,docs) => {
                            docs.forEach(element => {
                                locations.push(element);
                            });
                            Item.find({}, (err,docs) => {
                                docs.forEach(element => {
                                    items.push(element);
                                });
                                Class.find({}, (err, docs) => {
                                    docs.forEach(element => {
                                        classes.push(element);
                                    });
                                    Log.find({}, (err, docs) => {
                                        docs.forEach(element => {
                                            logs.push(element);
                                        });
                                        res.render('adminPanel', {
                                            user: req.user,
                                            users,
                                            mobs,
                                            quests,
                                            locations,
                                            classes,
                                            items,
                                            logs
                                        });
                                    })
                                });
                                
                            
                        });
                    });
                });
            });
        });
    } else {
        res.render('../dashboard')
    }
});
// MOB CREATION HANDLER
router.post('/create_mob', ensureAuthenticated, (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            req.flash('error_msg','File Upload Failed!')
            res.redirect('/admin_panel')
        } else {
            let img = req.file.path;
            let name = req.body.name;
            const newMob = new Mob({
                _id: new mongoose.Types.ObjectId(),
                img,
                name,
            });
            newMob.save()
            .then(() => {
                req.flash('success_msg','You Have Created a New Mob! ')
                res.redirect('/admin/admin_panel');
            })
            .catch(err => console.log(err));
            
        }
    });
});
// CLASS CREATION HANDLER
router.post('/create_class', ensureAuthenticated, (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            req.flash('error_msg','File Upload Failed!')
            res.redirect('/admin_panel')
        } else {
            const { name, str, agi, int, lck, wis, description } = req.body;
            const img = req.file.path;
            console.log(img, name, str, agi, int, lck, wis, description); 
            const stats = {
                Strength : str,
                Agility : agi,
                Intellegence : int,
                Luck : lck,
                Wisdom : wis,
            }
            const newClass = new Class({
                _id: new mongoose.Types.ObjectId(),
                img,
                name,
                stats,
                desc: description
            });
            newClass.save()
            .then(() => {
                req.flash('success_msg','You Have Created a New Class! ')
                res.redirect('/admin/admin_panel');
            })
            .catch(err => console.log(err));
        }
    });
});
// ITEM CREATION HANDLER
router.post('/create_item', ensureAuthenticated, (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            req.flash('error_msg','File Upload Failed!')
            res.redirect('/admin_panel')
        } else {
            const img = req.file.path;
            let { curr, eq, usea, quest, str, agi, int, wis, lck, name } = req.body;
            const statBoost = {
                str,
                agi,
                int,
                wis,
                lck,
            }
            console.log(quest, curr, usea, eq);
            if (quest != "true") {
                quest = false;
            } else {
                quest = true;
            };
            if (usea != "true") {
                usea = false;
            } else {
                user = true;
            };
            if (eq != "true") {
                eq = false;
            } else {
                eq = true;
            };
            if (curr != "true") {
                curr = false;
            } else {
                curr = true;
            };
            console.log(quest, curr, usea, eq);
            const newItem = new Item({
                _id: new mongoose.Types.ObjectId(),
                img,
                name,
                statBoost,
                isQuestable: quest,
                isEquipment: eq,
                isUsable: usea,
                isMoney: curr
            });
            console.log(newItem);
            newItem.save()
            .then(() => {
                req.flash('success_msg','You Have Created a New Item! ')
                res.redirect('/admin/admin_panel');
            })
            .catch(err => console.log(err));
        }
    });
});
// QUEST CREATION HANDLER
router.post('/create_quest', ensureAuthenticated, (req, res, next) => {
    const { item, iamount, mob, mamount, name } = req.body;
    console.log(req.body);
    const reward = {
        item,
        iamount,
    };
    const cond = {
        mob,
        mamount,
    };
    const newLog = new Log({
        _id: new mongoose.Types.ObjectId(),
        who: req.user._id,
        what: name,
    });
    newLog.save();
    const newQuest = new Quest({
        _id: new mongoose.Types.ObjectId(),
        reward,
        cond,
        name,
    });
    newQuest.save()
    .then(() => {
        req.flash('success_msg','You Have Created a New Quest! ')
        res.redirect('/admin/admin_panel');
    })
    .catch(err => console.log(err));
});
// QUEST CREATION HANDLER
router.post('/quest_delete', ensureAuthenticated, (req, res, next) => {
    console.log(req.body.delete_id);
});
module.exports = router;