const jwtService = require('../service/jwt.service');
const O_Auth = require('../dataBase/O_Auth');
const userUtil = require("../utils/user.util");
const {BAD_REQUEST} = require("../errors");
const ErrorHandler = require("../errors/ErrorHandler");
const {verifyToken} = require("../service/jwt.service");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;
            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userUtil.userNormalizator(user);

            const oauth = await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            await O_Auth.deleteOne({access_token});

            res.json('You are logout');
        } catch (e) {
            next(e);
        }
    }
};

