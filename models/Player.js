const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    playersClass: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    playersUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    playersInventory: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
    },
    playersStats: {
        type: Schema.Types.ObjectId,
        ref: 'Stats'
    },
    playersQL: {
        type: Schema.Types.ObjectId,
        ref: 'QL'
    },
    playersEquipment: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment'
    },
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;