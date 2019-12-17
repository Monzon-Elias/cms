const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    id: {type: String, required: true},
    name: {type: String},
    email: {type: String, required: true},
    phone: {type: String},
    imageUrl: {type: String},
    group: [{type: Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Contact', schema);