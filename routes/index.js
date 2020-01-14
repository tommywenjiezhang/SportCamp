var express = require('express');
var router = express.Router();
var passport = require('passport')
var IndexControl = require('../controller/index')

/* GET home page. */
router.get('/', IndexControl.home_page);

// register page
router.get('/register',IndexControl.register);

// post route
router.post('/register', IndexControl.post_register);

router.get('/login', IndexControl.login_get );

router.post('/login', passport.authenticate('local',{
        successRedirect: "/sports",
        failureRedirect: "/login"
    }
), IndexControl.login_post);

router.get('/logout', IndexControl.logout);

router.get('/ping', function(req, res){
    res.send("pong!", 200);
});

module.exports = router;
