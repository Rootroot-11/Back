const Device = require('../dataBase/Device');
const deviceValidator = require('../validators/device.validator');
const {BAD_REQUEST, ErrorHandler} = require("../errors");

module.exports = {
    createDeviceMiddleware: async (req, res, next) => {
        try {
            const {name} = req.body;
            const deviceById = await Device.findOne({name});
            if (deviceById) {
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isDeviceBodyValid: async (req, res, next) => {
        try {
            const {error, value} = deviceValidator.createDeviceValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST.status);
            }
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

};
