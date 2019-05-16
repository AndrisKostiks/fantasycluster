const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdministrator } = require('../config/auth');
const Player = require('../models/Player');
const Mob = require('../models/Mob');
const upload = require('../config/upload');
const mongoose = require('mongoose');

// ADMIN PANEL VIEW
router.get('/admin_panel', ensureAuthenticated, (req, res) => {
    if (ensureAdministrator(req.user) === true) {
        res.render('adminPanel', {
            user: req.user,
        });
    } else {
        res.render('../dashboard')
    }
});

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

module.exports = router;