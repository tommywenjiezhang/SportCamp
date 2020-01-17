var mongoose = require("mongoose");


var sportsSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
   rating: Number,
   author: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    username: String
 },
 comments: [
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
     }
  ]
});

module.exports = mongoose.model("Sport", sportsSchema);
