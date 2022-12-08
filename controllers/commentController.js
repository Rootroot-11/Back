const Device = require('../dataBase/Device');
const ErrorHandler = require("../errors/ErrorHandler");
const Review = require("../dataBase/Review");
const {Product_Already_Reviewed, DEVICE_NOT_FOUND, USER_DELETE} = require("../errors");
const mongoose = require("mongoose");
const { ReviewModel } = require("../dataBase/Review");

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
            const {_id} = req;
            const review = await ReviewModel.findOne({_id:_id});

            res.json(review);
        } catch (e) {
            next(e);
        }
    },

    createComment: async (req, res, next) => {
        try {

            const {rating, comment} = req.body;
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
                    rating: Number(rating),
                    comment,
                    user: req.user._id
                };

                device.reviews.push(review);
                device.numberReviews = device.reviews.length;
                device.rating =
                    device.reviews.reduce((acc, item) =>
                        item.rating + acc, 0) /
                    device.reviews.length;

                await device.save();
                res.status(201).json({message: "Review added"});
            } else {
                throw new ErrorHandler("Product not found", 404)
            }
        } catch (e) {
            next(e);
        }
    },

    createCommentFix: async (req, res) => {
        const {rating, comment} = req.body;

        const product = await Device.findById(req.params._id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString()
                    === req.user._id.toString()
            )
            if (alreadyReviewed) {
                throw new ErrorHandler(Product_Already_Reviewed.message, Product_Already_Reviewed.status)
            }

            const review = {
                nick_name: req.user.nick_name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review);

            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) =>
                    item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({message: "Review added"});
        } else {
            throw new ErrorHandler(DEVICE_NOT_FOUND.message, DEVICE_NOT_FOUND.status);
        }
    },

    // deleteComment:  async (req, res) => {
    //
    //     try {
    //
    //         const { _id } = req.params;
    //
    //         const devices = await Device.find();
    //
    //         let device;
    //
    //         devices.map((element)=>{
    //
    //             element?.reviews.map((elem,index)=>{
    //
    //                 if(elem._id == _id){
    //
    //                     device = element
    //
    //                     element.reviews.splice(index,1)
    //
    //                 }
    //
    //             })
    //
    //         })
    //
    //         console.log("device",device)
    //
    //         const id = device._id
    //
    //         delete device._id
    //
    //         const response = await Device.updateOne({_id:id},device);
    //
    //         console.log(response)
    //
    //         res.sendStatus(200);
    //
    //     } catch (e) {
    //
    //         console.log(e);
    //
    //         res.sendStatus(400);
    //
    //     }
    //
    // }
    // deleteComment: async (req, res, next) => {
    //     try {
    //         const _id = req.params._id;
    //
    //         const deletedReview = Review.findOne({_id: _id}).then(async (review) => {
    //             if (!review) {
    //                 return res.status(400).send({
    //                     message: 'No comment found',
    //                     data: {}
    //                 });
    //             } else {
    //                 let current_user = req.user;
    //
    //                 if (review.user_id != current_user._id) {
    //                     return res.status(400).send({
    //                         message: 'Access denied',
    //                         data: {}
    //                     })
    //                 } else {
    //                     await Review.deleteOne({_id: _id})
    //                 }
    //             }
    //         });
    //
    //         res.json(USER_DELETE.status, USER_DELETE.message);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}



