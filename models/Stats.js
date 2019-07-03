const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatsSchema = Schema({
    _id: Schema.Types.ObjectId,
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    strength: {
        type: Number,
        default: 1
    },
    agility: {
        type: Number,
        default: 1
    },
    killedMobs: {
        type: Map,
        of: String,
        default: null
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
});

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = Stats;