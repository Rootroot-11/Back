const Review = require('../dataBase/Review');
const ErrorHandler = require("../errors/ErrorHandler");
const {USER_NOT_FOUND} = require("../errors");
const mongoose = require("mongoose");
const Device = require('../dataBase/Device');

const {reviewSchema} = require("../dataBase/Review");

module.exports = {
    checkIdMiddleware: async (req, res, next) => {
        try {
            const commentModel = mongoose.model('comment', reviewSchema);

            const {comment_id} = req.params;
            const oneComment = await Device.findById(comment_id);

            if (!oneComment) {
                throw new ErrorHandler(USER_NOT_FOUND.message, USER_NOT_FOUND.status);
            }

            req.comment = oneComment;
            next();
        } catch (e) {
            next(e);
        }
    }
}
