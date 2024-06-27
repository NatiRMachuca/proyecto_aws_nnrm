const { downloadFile } = require("../sdk/s3/index.js")
const { createItem } = require("../sdk/dynamodb/index.js")
exports.handler = async (event) => {
    const objectKey = event.Records[0].s3.object.key;
    const bucketName = event.Records[0].s3.bucket.name;
    const response = await downloadFile(bucketName, objectKey);
    const transferObject = JSON.parse(response);
    if (transferObject.length > 0) {
        const promises = [];
        transferObject.forEach(element => {
            promises.push(createItem(element));
        });
        await Promise.all(promises);
    }
    return {
        statusCode: 200,
    };
};