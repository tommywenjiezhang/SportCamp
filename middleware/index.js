var Sport= require("../models/sports");
var Comment = require("../models/comment")
var Reply = require('../models/Reply')
// all the middleare goes here
var middlewareObj = {};


middlewareObj.checkSportOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Sport.findById(req.params.id, function(err, Sport){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the sport
            if(Sport.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that")
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkRepliesOwnership = function(req,res, next){
  if(req.isAuthenticated()){
         Reply.findById(req.params.replies_id, function(err, foundReply){
            if(err){
                res.redirect("back");
            }  else {
                // does user own the comment?
             if(foundReply.author.id.equals(req.user._id)) {
                 next();
             } else {
                 req.flash("error", "You don't have permission to do that");
                 res.redirect("back");
             }
            }
         });
     } else {
         req.flash("error", "You need to be logged in to do that");
         res.redirect("back");
     }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;
