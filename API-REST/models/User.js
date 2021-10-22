//Imports.
const mongoose = require('mongoose');

/*
Scheme for handling the Users.
*/
const User = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    typeUser: {
        type: String,   //type: usuario, administrador.
        required: true
    },
    forms: {
        type: [String],
        required: false
    }     
});
module.exports = mongoose.model('User', User); //Name and schema to use.