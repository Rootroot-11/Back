const {Schema, model} = require('mongoose');
const review = require('../dataBase/Review');

const deviceSchema = new Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    image: {
        type: String,
        required: false
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
        review
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
        // required: true,
    },
    statusOnMagazine: {
        type: Boolean,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
}, {timestamps: true});

module.exports = model('device', deviceSchema);
