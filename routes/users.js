var express = require('express');
var router = express.Router();
var User = require('../models/users')
/* GET users listing. */
router.get('/:user_id', function(req, res, next) {
  User.findById(req.params.user_id).populate('sports').exec(
   function(err,foundUser){
     if(err){
       console.log(err)
     }
     else{
       console.log(foundUser)
       res.render('user/index',{user:foundUser})
     }
   }
  )
});

// edit user route
router.get('/:user_id/edit',function(req, res, next) {
  User.findById(req.params.user_id, function(err, foundReply){
     if(err){
         res.redirect("back");
     } else {
       res.render("user/edit",{user:req.user})
     }
  })
})

router.post('/:user_id', function(req,res,next){
  User.findByIdAndUpdate(req.params.user_id,req.body.user, function(err, foundUser){
     if(err){
         res.redirect("back");
     } else {
       res.redirect("/users/" + req.user._id)
     }
  }
)
})




module.exports = router;
