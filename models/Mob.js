const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MobSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Mob = mongoose.model('Mob', MobSchema);

module.exports = Mob;