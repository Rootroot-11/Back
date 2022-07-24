const {passwordService} = require("../service");
const jwt = require("jsonwebtoken");
const {ACCESS_SECRET_KEY} = require("../configs");
const ErrorHandler = require("../errors/ErrorHandler");
const {verifyToken} = require("../service/jwt.service");
const O_Auth = require("../dataBase/O_Auth");
const User = require("../dataBase/User");

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
            // const token = req.headers.authorization.split(' ')[1];
            // if (!token) {
            //     return res.status(403).json({message: "Пользователь не авторизован"})
            // }

            // const decodedData = jwt.verify(token, ACCESS_SECRET_KEY);

            const data = await O_Auth.findOne({
                access_token: req.headers.authorization.split(' ')[1],
                refresh_token: req.headers.authorization.split(' ')[0]
            })

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
};
