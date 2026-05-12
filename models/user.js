const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// console.log(typeof passportLocalMongoose);

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); //automatically implement username
                                   //hashing and salting(random string added to password
                                   //  before hashing)

module.exports = mongoose.model("User", userSchema);