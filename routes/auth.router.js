const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require("../middlewares");
const router = require('express').Router();

router.post(
    '/login',
    userMiddleware.isUserPresent,
    authMiddleware.checkPassword,
    authController.login
);

router.post(
    '/logout',
    authMiddleware.validateAccessToken,
    authController.logout
);

module.exports = router;
