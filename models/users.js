var mongoose = require("mongoose");
var  Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: String,
    password: String,
    name:String,
    email:String,
    image: String,
    phone: Number,
    sports: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Sport"
        }
     ]
}
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
