var express = require('express');
var router = express.Router();
var Sport = require("../controller/sports")
var middleware = require("../middleware/index")

// get new page
router.get('/newSport',middleware.isLoggedIn,Sport.show_new_page)
// get list of sports
router.get('/', Sport.sport_list)
// create a new sport
router.post('/', middleware.isLoggedIn,Sport.sport_create_new)
// show specific sport
router.get("/:id", Sport.sport_show_specific)
// get edit activity
router.get("/:id/edit", middleware.checkSportOwnership,Sport.sport_show_edit);
// edit
router.put("/:id", middleware.checkSportOwnership, Sport.sport_edit_route);
// DESTROY Sport ROUTE
router.delete("/:id",middleware.checkSportOwnership,Sport.sport_remove);
//post_like
router.post("/:id/like",middleware.isLoggedIn,Sport.post_likes)


module.exports = router;
