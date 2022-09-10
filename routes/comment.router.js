const router = require('express').Router();
const commentController = require('../controllers/commentController');
const {authMiddleware} = require("../middlewares");
// const commentByIdMiddleware = require('../middlewares/commentById.middleware');
// const userController = require("../controllers/user.controller");
const deviceByIdMiddleware = require("../middlewares/deviceById.middleware");
// const {protect} = require("../middlewares/auth.middleware");

// router.get(
//     '/',
//     commentController.getAllComments);
//
// router.get(
//     '/:_id',
//     deviceByIdMiddleware.checkDevIdMiddleware,
//     commentController.getCommentByID
// );

router.post(
    '/:_id',
    authMiddleware.checkIsUserAuthMiddleware,
    commentController.createComment
);

router.get(
    '/:nick_name',
    commentController.getCommentByID
);

// router.delete(
//     '/:_id',
//     commentController.deleteComment
// );

module.exports = router;
