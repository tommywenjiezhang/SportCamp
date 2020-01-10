var express = require('express');
var router = express.Router();
var  mongoose   = require('mongoose');
var User = require('../models/users');


/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, allUsers){
     if(err){
         console.log(err);
     } else {
        res.render("index",{users:allUsers});
        console.log(allUsers)
     }
  });
});

module.exports = router;
