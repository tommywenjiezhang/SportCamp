var Sport= require("../models/sports");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Sport.findById(req.params.id, function(err, Sport){
           if(err){
               console.log("error", "Sport not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(Sport.author.id.equals(req.user._id)) {
                next();
            } else {
                console.log("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        console.log("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;
