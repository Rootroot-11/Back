const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

module.exports = model('o_auth', oAuthSchema);
