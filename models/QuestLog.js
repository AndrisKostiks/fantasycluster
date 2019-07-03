const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QLSchema = Schema({
    _id: Schema.Types.ObjectId,
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contains: [{
        type: Schema.Types.ObjectId,
        ref: 'Quest'
    }],
    completion: [Schema.Types.Mixed],
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

const QL = mongoose.model('QL', QLSchema);

module.exports = QL;