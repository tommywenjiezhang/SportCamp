var express = require('express');
var router  = express.Router({mergeParams: true});
var passport = require('passport');
var middleware = require('../middleware/index.js')
var reply = require('../controller/reply')

// new route
router.get('/new',middleware.isLoggedIn,reply.new_reply)
// new post route
router.post('/',middleware.isLoggedIn,reply.post_new_reply)
// replies EDIT ROUTE
router.get("/:replies_id/edit",middleware.checkRepliesOwnership,reply.edit_reply);
// // reply UPDATE
router.put("/:replies_id",middleware.checkRepliesOwnership,reply.update_reply)
// reply DESTROY ROUTE
router.delete("/:replies_id",middleware.checkRepliesOwnership,reply.destroy_reply);

module.exports = router;
