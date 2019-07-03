const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    statBoost: {
        type: Map,
        of: Number,
        default: null
    },
    isEquipment: {
        type: Boolean,
    },
    isUsable: {
        type: Boolean
    },
    isQuestable: {
        type: Boolean
    },
    isMoney: {
        type: Boolean
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;