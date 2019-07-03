const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    usersPlayers: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;