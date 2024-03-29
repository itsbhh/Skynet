const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    fullname: {
        type: String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    dob: {
        type: Date,
    }
});

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user', userSchema);  //creating a model of the schema and giving it the name 'user'
// Method to get the age of a user from their date of birth.
module.exports = user;