const Device = require('../dataBase/Device');
const ErrorHandler = require("../errors/ErrorHandler");
const Review = require("../dataBase/Review");

module.exports = {
    getAllComments: async (req, res, next) => {
        try {
            const devices = await Device.find();
            const review = devices.map(device => device.reviews.map(value => value));

          res.json(review);
        } catch (e) {
            next(e);
        }
    },

    getCommentByID: async (req, res, next) => {
        try {
            const {comment} = req;

            res.json(comment);
        } catch (e) {
            next(e);
        }
    },

    createComment: async (req, res, next) => {
        try {
            const {comment} = req.body;
            const device = await Device.findById(req.params._id);

            if (device) {
                const alreadyReviewed = device.reviews.find(
                    (r) => r.user.toString() === req.user._id.toString()
                );
                if (alreadyReviewed) {
                    throw new ErrorHandler("Product already reviewed", 400);
                }
                const review = {
                    nick_name: req.user.nick_name,
                    comment,
                    user: req.user._id
                };

                device.reviews.push(review);
                device.numberReviews = device.reviews.length;
                // device.rating =
                //     device.reviews.reduce((acc, item) =>
                //         item.rating + acc, 0) /
                //     device.reviews.length;

                await device.save();
                res.status(201).json({message: "Review added"});
            } else {
                throw new ErrorHandler("Product not found", 404)
            }
        } catch (e) {
            next(e);
        }
    },

    deleteComment: async (req, res, next) => {
        try {
            const {_id} = req.params;

            const deletedReview = Review.findByIdAndDelete(_id);

            res.json(deletedReview);
        } catch (e) {
            next(e);
        }
    }
}



