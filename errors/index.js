const {
    EMAIL_EXIST, USER_NOT_FOUND, ACCESS,
    WRONG_EMAIL_OR_PASSWORD, BAD_REQUEST, CREATED,
    USER_DELETE, USER_UPDATE, WRONG_TOKEN, DEVICE_NOT_FOUND,
    Not_Authorized, Product_Already_Reviewed
} = require('./errors.list');

module.exports = {
    ErrorHandler: require('./ErrorHandler'),
    WRONG_EMAIL_OR_PASSWORD,
    EMAIL_EXIST, USER_NOT_FOUND, ACCESS,
    BAD_REQUEST, CREATED, USER_DELETE, USER_UPDATE, WRONG_TOKEN, DEVICE_NOT_FOUND,
    Not_Authorized, Product_Already_Reviewed
};
