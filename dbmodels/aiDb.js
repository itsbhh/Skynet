const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aiResponseSchema = new Schema({
    query: String,
    response: String,
    file: {
        url: String,
        filename: String,
    },

});


const chatHistory = new Schema({
    history: [
        {
            role: String,
            parts: String
        }
    ]
});

const AIData = mongoose.model('airesponse', aiResponseSchema);
const history = mongoose.model('chatHistory', chatHistory);
module.exports = {
    AIData,
    history
};