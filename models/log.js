const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    weekBeginning: {
        type: Date,
        required: true,
    },
    subject: {
        type: String, // use a  custom type from a list of 
        required: true
    },
    task: {
        type: String,
        required: true
    },
    progress: {
        type: String,
        required: true
    }
})

/*
    - mongoose.model(NAME_OF_MODEL_IN_THE_DATABASE, NAME_OF_SCHEMA)
*/
module.exports = mongoose.model('Log', logSchema)