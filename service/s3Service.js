const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const {AWS_S3_REGION, AWS_S3_NAME, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY} = require('../configs/configs');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file = {}, itemType, itemId) => {
        const {originalname, buffer, mimetype} = file;
        const filePath = _fileNameBuilder(originalname, itemType, itemId);

        return bucket.upload ({
            Bucket: AWS_S3_NAME,
            Body: buffer,
            Key: filePath,
            ContentType: mimetype,
        }).promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExtension = fileName.split('.').pop();

    return path.join(itemType, itemId, `${uuidv4()}.${fileExtension}`);
}
