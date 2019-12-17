const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    url: {type: String, required: true}
});

module.exports = mongoose.model('Document', schema);