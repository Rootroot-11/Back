const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const reviewSchema = new Schema({
    nick_name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    }
}, {timestamps: true});

module.exports = reviewSchema;
