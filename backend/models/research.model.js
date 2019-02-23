const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Research = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    data: {
        type: Date
    },
    isEnabled: {
        type: Boolean
    }


});

module.exports = mongoose.model('Research', Research);
