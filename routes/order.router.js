const Order = require('../dataBase/Order');
const {verifyToken} = require("../middlewares/protect.auth.middleware");
const {authMiddleware} = require("../middlewares");

const router = require('express').Router();

router.post(
    '/',
    authMiddleware.checkIsUserAuthMiddleware,
    async (req, res) => {
        const newOrder = new Order(req.body);

        try {
            const savedOrder = await newOrder.save();
            res.json(savedOrder);
        } catch (err) {
            res.json(err);
        }
    }
)

module.exports = router;
