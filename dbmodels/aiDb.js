const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aiResponseSchema = new Schema({
    query: String,
    response: String,
    
});

const AIData = mongoose.model('airesponse', aiResponseSchema);

module.exports = AIData;