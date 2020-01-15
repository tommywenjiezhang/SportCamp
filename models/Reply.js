var mongoose = require("mongoose");


var replySchema = new mongoose.Schema({
   text:String,
   _comment:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
   },
   author: {
    id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    username: String
 }
});

module.exports = mongoose.model("Reply", replySchema);
