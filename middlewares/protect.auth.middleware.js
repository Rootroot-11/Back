// const jwt = require("jsonwebtoken");
// const {jwtService} = require("../service");
//
// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.access_token;
//     if (authHeader) {
//        const token = authHeader.split(' ')[1];
//        jwtService.verifyToken(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
//            if (err) res.json('token is not valid');
//            req.user = user;
//            next();
//        });
//     } else {
//         return res.json('you are not authenticated');
//     }
// };
//
// module.exports = {
//     verifyToken
// };
