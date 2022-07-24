const User = require('../dataBase/User');
const {ErrorHandler, BAD_REQUEST, WRONG_EMAIL_OR_PASSWORD} = require("../errors");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {user_id} = req.params;

            const userByEmail = await User.findOne({email}).select('-password');

            if(userByEmail) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            const oneUser = await User.findById(user_id).select('-password');

            req.user = oneUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User
                .findOne({email: req.body.email});

            if (!userByEmail) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {

            const {roles} = req.user;

            console.log('_____________');
            console.log(roles);
            console.log('_____________');

            if(!roleArr.includes(roles)) {
                throw new ErrorHandler('Access denied');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
