const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const orderSchema = new Schema(
    {
        // user: {
        //   type: mongoose.Schema.Types.Number,
        //   required: true,
        //   ref: 'user'
        // },
    userId: {type: String, required: true},
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
        amount: {
            type: Number,
            required: true,
            trim: true
        },
    address: {type: Object, required: false},
    status: {type: String, required: true, default: 'pending'},
},
    {timestamps: true});

module.exports = model('order', orderSchema);
