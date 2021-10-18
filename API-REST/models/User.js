const mongoose = require('mongoose');

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
        type: String,
        required: true
    },
    forms: {
        type:[String],
        required: false
    }     
});
module.exports = mongoose.model('User', User);