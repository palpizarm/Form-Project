//Imports.
const mongoose = require('mongoose');

/*
Scheme for handling the approval route of the Forms.
*/
const FormRoute = mongoose.Schema({
    formTitle: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receivers: {
        type: [String],
        required: true
    },
    approvalsRequired: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('FormRoute', FormRoute); // Name and schema to use.