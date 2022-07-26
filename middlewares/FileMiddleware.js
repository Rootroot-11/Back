const {PHOTOS_MIMETYPES,PHOTO_MAX_SIZE}=require('../constants/aws-s3');
const ErrorHandler = require("../errors/ErrorHandler");
const {BAD_REQUEST} = require("../errors");

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const {image} = req.files;

            if (!image) {
                next();
                return;
            }
            const {name,size,mimetype}=image;

            if(!PHOTOS_MIMETYPES.includes(mimetype)){
                throw new ErrorHandler(BAD_REQUEST.status, BAD_REQUEST.message);
            }

            if(size>PHOTO_MAX_SIZE){
                throw new ErrorHandler(BAD_REQUEST.message, BAD_REQUEST.status);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
