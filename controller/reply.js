var Reply = require("../models/Reply")
var Comment = require("../models/comment");
var Sport = require("../models/sports");
var passport = require('passport');
var middleware = require('../middleware/index.js')

exports.new_reply = function(req,res){
  Sport.findById(req.params.id, function(err, sport){
      if(err){
          console.log(err);
          res.redirect("/sports/"+sport._id);
      } else {
        Comment.findById(req.params.comment_id,function(err,findComment){
          if(err){
            console.log(err)
          }
          else{
            res.render("Replies/new",{comment:findComment,sport:sport})
          }
        })
      }
    })
}

exports.post_new_reply =  function(req,res){
  Sport.findById(req.params.id, function(err, sport){
      if(err){
          console.log(err);
          res.redirect("/sports/" + req.params.id)
      } else {
      Comment.findById(req.params.comment_id, function(err,comment){
        if(err){
          console(err)
          res.redirect("back");
        }else{
          Reply.create(req.body.reply,function(err, reply){
            if(err){
              console.log(err)
            }else{
              reply.author.id = req.user._id;
              reply.author.username = req.user.username;
              reply.save()
              comment.replies.push(reply)
              comment.save()
              req.flash("success", "Successfully replies");
              res.redirect("/sports/" + req.params.id)
            }
          })
        }
      })
    }
  });
}

exports.edit_reply = function(req, res){
   Reply.findById(req.params.replies_id, function(err, foundReply){
      if(err){
          res.redirect("back");
      } else {
        res.render("Replies/edit", {sports_id:req.params.id, comment_id:req.params.comment_id, reply:foundReply});
      }
   });
}

exports.update_reply = function(req,res){
  Reply.findByIdAndUpdate(req.params.replies_id, req.body.reply, function(err, updatedReply){
     if(err){
         res.redirect("back");
     } else {
         res.redirect("/sports/" + req.params.id );
     }
})
}

exports.destroy_reply = function(req, res){
    //findByIdAndRemove
    Reply.findByIdAndRemove(req.params.replies_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/sports/" + req.params.id);
       }
    });
}
