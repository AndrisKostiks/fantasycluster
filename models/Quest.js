const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    reward: {
        type: Map,
        of: String,
        default: null
    },
    cond: {
        type: Map,
        of: String,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    isTaken: {
        type: Boolean,
        default: false
    }
});

const Quest = mongoose.model('Quest', QuestSchema);

module.exports = Quest;