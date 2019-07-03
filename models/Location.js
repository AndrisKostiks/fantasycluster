const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    cont: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    },
    shortCont: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: false
    }
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;