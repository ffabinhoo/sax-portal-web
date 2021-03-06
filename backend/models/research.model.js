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
    
    link_shiny: {
        type: String
    },

    isEnabled: {
        type: String
    }
});

module.exports = mongoose.model('Research', Research);
