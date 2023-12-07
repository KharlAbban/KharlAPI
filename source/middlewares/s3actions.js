if (process.env.NODE_ENV !== "production") require("dotenv").config();
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

// S3 Client Stuff
const bucketName = process.env.S3_BUCKET_NAME;
const bucketRegion = process.env.S3_BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey
	},
	region: bucketRegion
});

async function putObjectInsideBucket (filename, bufferData, contentType) {
    const params = {
        Bucket: bucketName,
        Key: filename,
        Body: bufferData,
        ContentType: contentType
    }

    const putCommand = new PutObjectCommand(params);

    try {
        await s3.send(putCommand);
        return true;
    } catch (err) {
        console.log(err.message);
    }
}

async function getObjectInsideBucket (filename) {
    const params = {
        Bucket: bucketName,
        Key: filename,
    }

    const getCommand = new GetObjectCommand(params);

    try {
        const url = await getSignedUrl(s3, getCommand, {expiresIn: 3600});
        // console.log(url);
        return url;
    } catch (err) {
        console.log(err.message);
    }
}
// async putObjectInsideBucket () {}

module.exports = {
    putObjectInsideBucket,
    getObjectInsideBucket
}