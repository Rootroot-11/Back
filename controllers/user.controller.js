const User = require('../dataBase/User');
const userUtil = require("../utils/user.util");
const {passwordService, emailService} = require("../service");
const {WELCOME} = require("../configs/email-action.enum");
const ErrorHandler = require("../errors/ErrorHandler");
const {userNormalizator} = require("../utils/user.util");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password, email, nick_name} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});
            await emailService.sendMail(email, WELCOME, {nick_name});
            const finalUser = userUtil.userNormalizator(newUser);

            res.json(finalUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {

            const {user_id} = req.params;

            let user = User.findByIdAndUpdate(user_id, req.body, {new: true}).lean();

            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getUsersById: async (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user)

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const deletedUser = await User.findByIdAndDelete(user_id);

            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    }
};

