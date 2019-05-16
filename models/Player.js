const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    pclass: {
        type: String,
        default: 'Warrior'
    },
    strength: {
        type: Number,
        default: 1
    },
    agility: {
        type: Number,
        default: 1
    },
    intellegence: {
        type: Number,
        default: 1
    },
    wisdom: {
        type: Number,
        default: 1
    },
    luck: {
        type: Number,
        default: 1
    },
    exp: {
        type: Number,
        default: 1
    },
    lvl: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
    playersUser: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;