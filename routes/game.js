const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated,
    ensureAdministrator
} = require('../config/auth');
const Player = require('../models/Player');
const User = require('../models/User');
const Mob = require('../models/Mob');
const QuestLog = require('../models/QuestLog');
const Inventory = require('../models/Inventory');
const url = require('url');
const Quest = require('../models/Quest');
const Equipment = require('../models/Equipment');
const Stats = require('../models/Stats');
const Class = require('../models/Class');
const Item = require('../models/Item');
const mongoose = require('mongoose');

router.get('/', ensureAuthenticated, (req, res) => {
    let player_id;
    if (req.query.player_id != "" && req.query.player_id != null) {
        console.log(req.query.player_id);
        player_id = req.query.player_id;
    } else {
        console.log(req.body.player_id);
        player_id = req.body.player_id;
    }
    // const user_id = req.query.user_id;
    let players = [];
    let quests = [];
    let pquests = [];
    let pql = [];
    let pclass = {};
    let inventory = [];
    let pitems = [];
    let sstats = [];
    let stats = [];
    let equipment = [] = [];
    let player = [];
    let keys = [];
    let bplayers = [];
    Mob.aggregate([{
        $sample: {
            size: 1
        }
    }], (err, mobs) => {
        mobs.forEach(mob => {
            Player.find({
                '_id': mongoose.Types.ObjectId(`${player_id}`)
            }, (err, docs) => {
                docs.forEach(element => {
                    player.push(element);
                });
                console.log(mongoose.Types.ObjectId(`${player_id}`));
                console.log('THIS IS YOUR PLAYER!' + player);
                Player.find({}, (err, docs) => {
                    docs.forEach(element => {
                        players.push(element);
                    });
                    Stats.find({
                        '_id': player[0].playersStats
                    }, (err, docs) => {
                        docs.forEach(element => {
                            stats.push(element);
                            let temp = JSON.stringify(element.killedMobs);
                            keys = JSON.parse(temp);
                        });
                        console.log(stats[0]);
                        Stats.find({}, (err, docs) => {
                            docs.forEach(element => {
                                sstats.push(element);
                            });
                            QuestLog.find({
                                'belongsTo': player_id
                            }, (err, docs) => {
                                docs.forEach(element => {
                                    pql.push(element);
                                });
                                Quest.find({
                                    'isTaken': false
                                }, (err, docs) => {
                                    docs.forEach(element => {
                                        quests.push(element);
                                    });
                                    Inventory.find({
                                        'belongsTo': player_id
                                    }, (err, docs) => {
                                        docs.forEach(element => {
                                            inventory.push(element);
                                        });
                                        Equipment.find({
                                            'belongsTo': player_id
                                        }, (err, docs) => {
                                            docs.forEach(element => {
                                                equipment.push(element);
                                            });
                                            Class.find({
                                                '_id': player[0].playersClass
                                            }, (err, docs) => {
                                                docs.forEach(element => {
                                                    pclass = element;
                                                });
                                                Item.find({}, (err, docs) => {
                                                    // console.log(inventory[0]);
                                                    docs.forEach(element => {
                                                        for (i = 0; i < inventory[0].contains.length; i++) {
                                                            if (element._id === inventory[0].contains[i]) {
                                                                pitems.push(element);
                                                            };
                                                        };
                                                    });
                                                    Quest.find({
                                                        isTaken: true
                                                    }, (err, docs) => {
                                                        docs.forEach(element => {
                                                            for (i = 0; i < pql[0].contains.length; i++) {
                                                                console.log(element._id.toString()+"element irl");
                                                                console.log(pql[0]);
                                                                console.log(pql[0].contains[i] +"for index locatio n");
                                                                if (element._id.toString() == pql[0].contains[i]) {
                                                                    pquests.push(element);
                                                                };
                                                            };
                                                        });

                                                            sstats.forEach(element => {
                                                                bplayers.push(element);
                                                            });
                                                            bplayers.sort((a, b) => parseFloat(b.lvl) - parseFloat(a.lvl));
                                                            console.log(bplayers);
                                                        res.render('main', {
                                                            keys,
                                                            player,
                                                            players,
                                                            bplayers,
                                                            pitems,
                                                            stats,
                                                            pql,
                                                            pquests,
                                                            sstats,
                                                            quests,
                                                            pclass,
                                                            inventory,
                                                            equipment
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
router.get('/fight', ensureAuthenticated, (req, res) => {
    let player_id = req.query.id;
    let player = {};
    let pclass = {};
    let pinv = {};
    let peq = {};
    let pstats = {};
    Mob.aggregate([{
        $sample: {
            size: 1
        }
    }], (err, mobs) => {
        mobs.forEach(mob => {

            // mob.img.replace('/assets', ' ');
            mob.img = mob.img.replace('assets', '.');
            Player.findOne({
                '_id': player_id
            }, (err, doc) => {
                player = doc;
                Class.findOne({
                    '_id': player.get("playersClass")
                }, (err, doc) => {
                    pclass = doc;
                    Inventory.findOne({
                        'belongsTo': player_id
                    }, (err, doc) => {
                        pinv = doc;
                        Equipment.findOne({
                            'belongsTo': player_id
                        }, (err, doc) => {
                            peq = doc;
                            Stats.findOne({
                                'belongsTo': player_id
                            }, (err, doc) => {
                                pstats = doc;
                                res.render('fight', {
                                    pclass,
                                    pinv,
                                    peq,
                                    pstats,
                                    user: req.user,
                                    player,
                                    mob,
                                });
                            });
                        });
                    });
                });
            });

        });
    });


});

router.post('/winner', ensureAuthenticated, (req, res) => {
    let player_id = req.body.player_id;
    let mob = req.body.mob_name;
    console.log("your id" + player_id);
    Stats.findOne({
        'belongsTo': player_id
    }, (err, doc) => {
        if (err) {
            throw (err);
        } else {
            if (doc.exp < (doc.lvl * 10)) {
                let cur = doc.get(`killedMobs.${mob}`);
                if (cur == null) {
                    cur = 1;
                } else {
                    cur = parseInt(cur, 10) + 1;
                }
                doc.set(`killedMobs.${mob}`, `${cur}`);
                doc.exp = doc.exp + 1;
                console.log(doc);
                doc.save();
                req.flash('success_msg', `You Have Slain a ${mob}!`);

                res.redirect(url.format({
                    pathname: "/game/",
                    query: {
                        "player_id": player_id
                    }
                }));
            } else {
                console.log('nothing');
                req.flash('error_msg', `You have hit max EXP, time to level up!`);
                res.redirect(url.format({
                    pathname: "/game/",
                    query: {
                        "player_id": player_id
                    }
                }));
            }

        }
    });


});

router.post('/lvl', ensureAuthenticated, (req, res) => {
    let {_id, str,int,agi,wis,lck} = req.body;
    Stats.findOne({ 'belongsTo': _id }, (err, doc) => {
        if (err) {
            throw err;
        } else {
            doc.luck = lck;
            doc.strength = str;
            doc.intellegence = int;
            doc.agility = agi;
            doc.wisdom = wis;
            doc.lvl = parseInt(doc.lvl, 10) + 1;
            doc.exp = 0;
            console.log('important' + doc);
            doc.save();
            req.flash('success_msg', `You have leveled up!!`);
                res.redirect(url.format({
                    pathname: "/game/",
                    query: {
                        "player_id": _id
                    }
                }));
        }
    });


});

router.post('/get_quest', ensureAuthenticated, (req, res) => {
    let {
        ql,
        quest_id
    } = req.body;
    QuestLog.findOne({
        '_id': ql
    }, (err, doc) => {
        doc.contains.push(quest_id);
        doc.save();
    });
    Quest.findOne({
        '_id': quest_id
    }, (err, doc) => {
        doc.isTaken = true;
        doc.save();
    });
    const player_id = req.body.player_id;
    let players = [];
    let quests = [];
    let pql = [];
    let keys = [];
    let bplayers = [];
    let pquests = [];
    let pclass = {};
    let inventory = [];
    let pitems = [];
    let sstats = [];
    let stats = [];
    let equipment = [] = [];
    let player = [];
    Player.find({
        '_id': req.body.player_id
    }, (err, docs) => {
        docs.forEach(element => {
            player.push(element);
        });
        // console.log(player);
        Player.find({}, (err, docs) => {
            docs.forEach(element => {
                players.push(element);
            });
            Stats.find({
                '_id': player[0].playersStats
            }, (err, docs) => {
                docs.forEach(element => {
                    stats.push(element);
                    let temp = JSON.stringify(element.killedMobs);
                    keys = JSON.parse(temp);
                });
                Stats.find({}, (err, docs) => {
                    docs.forEach(element => {
                        sstats.push(element);
                    });
                    QuestLog.find({
                        'belongsTo': player_id
                    }, (err, docs) => {
                        docs.forEach(element => {
                            pql.push(element);
                        });
                        Quest.find({}, (err, docs) => {
                            docs.forEach(element => {
                                quests.push(element);
                            });
                            Inventory.find({
                                'belongsTo': player_id
                            }, (err, docs) => {
                                docs.forEach(element => {
                                    inventory.push(element);
                                });
                                Equipment.find({
                                    'belongsTo': player_id
                                }, (err, docs) => {
                                    docs.forEach(element => {
                                        equipment.push(element);
                                    });
                                    Class.find({
                                        '_id': player[0].playersClass
                                    }, (err, docs) => {
                                        docs.forEach(element => {
                                            pclass = element;
                                        });
                                        Item.find({}, (err, docs) => {

                                            docs.forEach(element => {
                                                for (i = 0; i < inventory[0].contains.length; i++) {
                                                    if (element._id === inventory[0].contains[i]) {
                                                        pitems.push(element);
                                                    };
                                                };
                                            });
                                            Quest.find({}, (err, docs) => {
                                                docs.forEach(element => {
                                                    for (i = 0; i < pql[0].contains.length; i++) {
                                                        if (element._id === pql[0].contains[i]) {
                                                            pquests.push(element);
                                                        };
                                                    };
                                                });
                                                sstats.forEach(element => {
                                                    bplayers.push(element);
                                                });
                                                bplayers.sort((a, b) => parseFloat(a.lvl) - parseFloat(b.lvl));
                                                res.render('main', {
                                                    player,
                                                    players,
                                                    pitems,
                                                    pquests,
                                                    bplayers,
                                                    stats,
                                                    pql,
                                                    keys,
                                                    sstats,
                                                    quests,
                                                    pclass,
                                                    inventory,
                                                    equipment
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;