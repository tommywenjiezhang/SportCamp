var express = require('express');
var router = express.Router();
var Sport = require("../controller/sports")

// get new page
router.get('/newSport', Sport.show_new_page)
// get list of sports
router.get('/', Sport.sport_list)
// create a new sport
router.post('/',Sport.sport_create_new)
// show specific sport
router.get("/:id", Sport.sport_show_specific)
// get edit activity
router.get("/:id/edit", Sport.sport_show_edit);
// edit
router.put("/:id", Sport.sport_edit_route);
// DESTROY Sport ROUTE
router.delete("/:id",Sport.sport_remove);


module.exports = router;
