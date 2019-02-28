const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    
    login: {
        type: String
    },
    
    password: {
        type: String
    },


    isEnabled: {
        type: String
    }
});

module.exports = mongoose.model('User', User);
