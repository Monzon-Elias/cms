const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxDocumentsId: { type: Number, require: true },
    maxMessageId: { type: Number, require: true },
    maxContactId: {type: Number, require: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);