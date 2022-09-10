const {passwordService} = require("../service");
const jwt = require("jsonwebtoken");
const {ACCESS_SECRET_KEY} = require("../configs");
const ErrorHandler = require("../errors/ErrorHandler");
const {verifyToken} = require("../service/jwt.service");
const O_Auth = require("../dataBase/O_Auth");
const User = require("../dataBase/User");
const {Not_Authorized} = require("../errors");
const asyncHandler = require('express-async-handler');

module.exports = {
    checkPassword: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {user} = req;

            await passwordService.compare(password, user.password);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserAuthMiddleware: async (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const data = await O_Auth.findOne({
                access_token: req.headers.authorization.split(' ')[1],
                refresh_token: req.headers.authorization.split(' ')[0]
            });

            req.user = await User.findOne({_id: data.user_id});
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    },

    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                throw new ErrorHandler(401, 'No token');
            }

            await verifyToken(access_token);

            const tokenFromDB = await O_Auth.findOne({access_token});

            if (!tokenFromDB) {
                throw new ErrorHandler(401, 'Not valid token 111');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    protect: asyncHandler(async (req, res, next) => {
        let access_token

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                access_token = req.headers.authorization.split(' ') [1];
                const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded._id).select('-password');
                next();
            } catch (error) {
                console.log(error)
                throw new ErrorHandler(Not_Authorized.message, Not_Authorized.status)
            }
        }
        if (!access_token) {
            throw new ErrorHandler(Not_Authorized.message, Not_Authorized.status)
        }
    })

};


// const admin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next()
//     } else {
//         throw new ErrorHandler (Not_Authorized.message, Not_Authorized.status);
//     }
// }
