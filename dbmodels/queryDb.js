const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    query: String,
    result: Object,
});


const search = mongoose.model('search', searchSchema);
module.exports = search;
