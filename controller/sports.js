var  mongoose   = require('mongoose');
var Sport = require('../models/sports');
var Comment =  require('../models/comment')
var Reply = require("../models/Reply")

exports.show_new_page =  function(req,res,next){
    res.render("sports/new",{users: req.user});
}


exports.sport_list = function(req,res,next){ Sport.find({}, function(err, allSports){
   if(err){
       console.log(err);
   } else {
      res.render("sports/index",{sports:allSports});
      console.log(allSports)
   }
});}

exports.sport_create_new = function(req,res,next){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description
  var rating = req.body.rating
  var author = {
       id: req.user._id,
       username: req.user.username
   }
  var newSport = {name:name, image:image, description:description, rating:rating, author:author}


  Sport.create(newSport, function(err, newlyCreated){
    if(err){
        console.log(err);
    } else {
        //redirect back to sports page
        console.log(newlyCreated);
        res.redirect("/sports");
    }
});
}

exports.sport_show_specific = function (req,res){
  Sport.findById(req.params.id).populate({"path":"comments",
        "populate":
        {
          "path":"replies",
          "model":"Reply"
        }
      }).exec(function(err, foundSport){
       if(err){
           console.log(err);
       } else {
             if(err){
               console.log(err)
             }
             else{
               // res.json(foundSport)
               res.render("sports/show", {sport: foundSport, users: req.user});
             }
       }
   });
}
// shows the edit page with data
exports.sport_show_edit =  function(req, res){
    Sport.findById(req.params.id, function(err, foundSport){
        res.render("sports/edit", {sport: foundSport});
    });
}

// edit route
exports.sport_edit_route =  function(req, res){
    // find and update the correct campground
    Sport.findByIdAndUpdate(req.params.id,req.body.sport,function(err, updatedSport){
       if(err){
         console.log("error "+ err)
         console.log("sport in error "+ updatedSport)
           res.redirect("/sports");
       } else {
           //redirect somewhere(show page)
           console.log("sport: sucess: "+ updatedSport)
           res.redirect("/sports/" + req.params.id);
       }
    });
}
// destroy route
exports.sport_remove  = function(req, res){
  Sport.findByIdAndRemove(req.params.id, function (err) {
       if(err){
           console.log("OOPS!! Something went wrong.");
       } else {
           // redirect somewhere
           res.redirect("/sports");
       }
   })
}
