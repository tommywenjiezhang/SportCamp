var mongoose = require("mongoose");


var sportsSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   rating: Number,
   author: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    username: String
 },
});

module.exports = mongoose.model("Sport", sportsSchema);
