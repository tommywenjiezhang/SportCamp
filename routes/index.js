var express = require('express');
var router = express.Router();
var  mongoose   = require('mongoose');
var User = require('../models/users');
var passport = require('passport')


/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, allUsers){
     if(err){
         console.log(err);
     } else {
        res.render("index",{users:req.user});
        console.log(allUsers)
     }
  });
});

// register page
router.get('/register', function(req, res) {
    res.render('user/register', { });
});

// post route
router.post('/register', function(req, res) {
  var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
           console.log(err + user)
             return res.render("user/register");
         }
         passport.authenticate("local")(req, res, function(){
            res.redirect("/sports");
         });
     });
});

router.get('/login', function(req, res) {
    res.render('user/login', { user : req.user });
});

router.post('/login', passport.authenticate('local',{
        successRedirect: "/sports",
        failureRedirect: "/login"
    }
), function(req, res,next) { next();
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.send("pong!", 200);
});

module.exports = router;
