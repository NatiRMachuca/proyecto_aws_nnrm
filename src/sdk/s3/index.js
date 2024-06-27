
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");


const client = new S3Client({});

const downloadFile = async (bucketName, fileKey) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
    });

    try {
        const response = await client.send(command);
        return response.Body.transformToString();
    } catch (err) {
        console.error(err.message);
        return JSON.stringify([]);
    }
};

module.exports = {
    downloadFile
}