const Device = require('../dataBase/Device');
const ErrorHandler = require("../errors/ErrorHandler");
const {DEVICE_NOT_FOUND} = require("../errors");

module.exports = {
    checkIdMiddleware: async (req, res, next) => {
        try {
            const {device_id} = req.params;
            const oneDevice = await Device.findById(device_id);

            if (!oneDevice) {
                throw new ErrorHandler(DEVICE_NOT_FOUND.message, DEVICE_NOT_FOUND.status);
            }
            req.device = oneDevice;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkDevIdMiddleware: async (req, res, next) => {
        try {
            const {_id} = req.params;
            const devices = await Device.find();

            const review = devices.map(device => device.reviews.map(value => value.reviewSchema));
            const comment = review.findById(_id);

            if(!comment) {
                throw new ErrorHandler(DEVICE_NOT_FOUND.message, DEVICE_NOT_FOUND.status);
            }

            req.comment = comment;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkCommentIdMiddleware: async (req, res, next) => {
        try {
            const {comment_id} = req.params;
            const oneDevice = await Device.reviews.findById(comment_id);
        } catch (e) {
            next(e);
        }
    }

};
