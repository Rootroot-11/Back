const jwt = require('jsonwebtoken');
const {ACCESS_SECRET_KEY} = require("../configs");

module.exports = {
    generateToken: (_id) => {
        const access_token = jwt.sign({_id}, ACCESS_SECRET_KEY, {expiresIn: '1h'});

        return {
           access_token
        }
    }
}


