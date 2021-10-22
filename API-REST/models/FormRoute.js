const mongoose = require('mongoose');

const FormRoute = mongoose.Schema({
    formTitle: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required : true
    },
    receivers:{
        type:[String],
        required:true
    },
    approvalsRequired:{
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('FormRoute', FormRoute);