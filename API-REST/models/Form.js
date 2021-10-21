const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions:{
        type: [String],
        required: true
    },
    answers: {
        type: [String],
        required : true
    },
    date : {
        type: Date,
        default: Date.now
    },
    // state : revision, aceptado, rechazado
    state:{
        type:String,
        required:true
    },
    sender:{
        type: String,
        required:true
    },
    approvers:{
        type: [String],
        required : true
    },
    rejecters:{
        type: [String],
        required : true
    },
    receivers:{
        type: [String],
        required : true
    }
});

module.exports = mongoose.model('Form', FormSchema); //name and schema to use
