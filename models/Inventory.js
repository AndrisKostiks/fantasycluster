const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = Schema({
    _id: Schema.Types.ObjectId,
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contains: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;