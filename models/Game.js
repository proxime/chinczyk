const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    },
    players: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Game = mongoose.model('game', GameSchema);
