var express = require('express');
var router  = express.Router({mergeParams: true});
var Comment = require('../controller/comment')
var passport = require('passport');
var middleware = require('../middleware/index.js')


router.get('/new',middleware.isLoggedIn,Comment.create_new_comment)

router.post('/',middleware.isLoggedIn, Comment.post_new_comment)

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,Comment.edit_comment);

// COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,Comment.update_comment);

// COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,Comment.destroy_comment);

module.exports = router;
