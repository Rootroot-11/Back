const {Schema, model} = require('mongoose');
const reviewSchema = require("./Review");
const mongoose = require("mongoose");


const deviceSchema = new Schema({
    name: {
        type: String,
        // required: true,
        trim: true,
    },
    avatar: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        // required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: false,
        default: 0,
    },
    reviews: [
        reviewSchema
    ],
    numberReviews: {
        type: Number,
        require: true,
        default: 0,
    },
    type: {
        type: String,
        // required: true,
    },
    brand: {
        type: String,
        required: false,
    },
    statusOnMagazine: {
        type: Boolean,
        trim: false
    },
    email: {
        type: String,
        trim: false
    }
}, {timestamps: true});

module.exports = model('device', deviceSchema);
