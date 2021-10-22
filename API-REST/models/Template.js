//Imports.
const mongoose = require('mongoose');

/*
Scheme for handling the Templates. 
Each template can only be created by "administrador" users.
*/
const Template = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [String],
        required: true
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

module.exports = mongoose.model('Template', Template); //Name and schema to use.