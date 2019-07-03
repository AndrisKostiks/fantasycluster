const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    stats: {
        type: Map,
        of: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    desc: {
        type: String
    }
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;