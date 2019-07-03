const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = Schema({
    _id: Schema.Types.ObjectId,
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    head: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    weapon: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    torso: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    trinket:  {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }
});

const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = Equipment;