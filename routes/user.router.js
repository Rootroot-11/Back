const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');
const userMiddleware = require('../middlewares/user.middleware');
const userByIdMiddleware = require('../middlewares/userById.middleware');
const {authMiddleware} = require("../middlewares");
const {ADMIN} = require("../configs/user-roles.enum");
const ErrorHandler = require("../errors/ErrorHandler");

router.get(
    '/',
    // userMiddleware.checkUserRole(ADMIN, VIEWER),
    userController.getUsers);

router.get(
    '/:user_id',
    userByIdMiddleware.checkIdMiddleware,
    // authMiddleware.validateAccessToken,
    userController.getUsersById
);

router.post(
    '/registration',
    userMiddleware.createUserMiddleware,
    userController.createUser
);

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(userValidator.updateUserValidator),
    userController.updateUser
);

router.delete(
    '/:user_id',
    userMiddleware.checkUserRole(ADMIN),
    userController.deleteUser
);

module.exports = router;


// getComments: async (req, res, next) => {
//     try {
//         const reviews = await Review.find();
//
//         res.json(reviews);
//     } catch (e) {
//         next(e);
//     }
// },

// getCommentsById: (req, res) => {
//     try {
//         const {review} = req;
//
//         res.json(review);
//     } catch (e) {
//         console.log(e);
//     }
// },
