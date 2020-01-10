var mongoose = require("mongoose");


var sportsSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   rating: Number,
});

module.exports = mongoose.model("Sport", sportsSchema);
