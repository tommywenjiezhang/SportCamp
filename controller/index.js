var  mongoose   = require('mongoose');
var User = require('../models/users');
var passport = require('passport')

exports.home_page = function(req, res, next) {
  User.find({}, function(err, allUsers){
     if(err){
         console.log(err);
     } else {
        res.render("index",{user :req.user});
        console.log(allUsers)
     }
  });
}
exports.register = function(req, res) {
    res.render('user/register', { });
}

exports.post_register = function(req, res) {
  var newUser = new User({username: req.body.username,name:req.body.user.name,phone:req.body.user.phone,email:req.body.user.email});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
           console.log(err + user)
             return res.render("user/register");
         }
         passport.authenticate("local")(req, res, function(){
           req.flash('success','User Successfully Added')
            res.redirect("/sports");
         });
     });
}
exports.login_get  = function(req, res) {
    res.render('user/login');
}
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
exports.login_post = function(req, res,next) {
    next();
    req.flash('success', 'Successfully Login')
}
