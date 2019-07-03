const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = Schema({
    _id: Schema.Types.ObjectId,
    who: Schema.Types.ObjectId,
    what: {
        type: String,
        default: null
    },
    when: {
        type: Date,
        default: Date.now
    },
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
