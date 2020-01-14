var Comment = require("../models/comment");
var Sport = require("../models/sports");


exports.create_new_comment = function(req,res){
  Sport.findById(req.params.id,function(err,findSport){
    if(err){
      console.log(err)
    }
    else{
      res.render("comment/new",{sport:findSport})
    }
  })
}

exports.post_new_comment  = function(req,res){
  Sport.findById(req.params.id, function(err, sport){
      if(err){
          console.log(err);
          res.redirect("/sports");
      } else {
       Comment.create(req.body.comment, function(err, comment){
          if(err){
              console.log(err);
          } else {
              console.log(req.body.comment)
              //add username and id to comment
              comment.author.id = req.user._id;
              comment.author.username = req.user.username;
              //save comment
              comment.save();
              sport.comments.push(comment);
              sport.save();
              req.flash("success", "Successfully added comment");
              res.redirect('/sports/' + sport._id);
          }
       });
      }
  });
}

exports.edit_comment =  function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comment/edit", {sports_id:req.params.id, comment:foundComment});
      }
   });
}

exports.update_comment = function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/sports/" + req.params.id );
      }
   });
}

exports.destroy_comment = function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/sports/" + req.params.id);
       }
    });
}
