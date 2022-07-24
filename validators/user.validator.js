const Joi = require('joi');
const {EMAIL_REGEX, PASSWORD_REGEX} = require("../configs");
const userRolesEnum = require('../configs/user-roles.enum');

const createUserValidator = Joi.object({
    nick_name: Joi
        .string()
        .min(2)
        .max(20)
        .trim()
        .lowercase()
        .required(),
    email: Joi
        .string(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEX),
    roles: Joi
        .string()
        .allow(...Object.values(userRolesEnum)),
    isAdmin: Joi
        .string()
});

const updateUserValidator = Joi.object({
    nick_name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
});

module.exports = {
    createUserValidator, updateUserValidator
};
