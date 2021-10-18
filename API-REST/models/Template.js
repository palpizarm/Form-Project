const mongoose = require('mongoose');

const Template = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [String],
        required : true
    },
    type: {
        type: [String],
        required : true
    },
    obligatory: {
        type: [Boolean], 
        required: true
    },
    values: {
        type: [[String]], 
        required: true
    }
});

module.exports = mongoose.model('Template', Template); //name and schema to use