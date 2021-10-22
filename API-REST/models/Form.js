//Imports.
const mongoose = require('mongoose');

/*
Scheme for handling the Forms.
*/
const FormSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [String],
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,    // type: Revision, Aceptado, Rechazado.
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    approvers: {
        type: [String],
        required: true
    },
    rejecters: {
        type: [String],
        required: true
    },
    receivers: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Form', FormSchema); // Name and schema to use.
