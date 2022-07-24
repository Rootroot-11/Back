const {O_AUTH_MODEL, USER_MODEL} = require('./model-name.enum');
const {ACCESS, REFRESH} = require('./token-type.enum');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY} = require('./variables');
const { AUTHORIZED_USER, ADMIN, VIEWER } = require('./user-roles.enum');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('./constans');

module.exports = {
    O_AUTH_MODEL, USER_MODEL, ACCESS, REFRESH, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY,
    AUTHORIZED_USER, ADMIN, VIEWER, EMAIL_REGEX, PASSWORD_REGEX
};
