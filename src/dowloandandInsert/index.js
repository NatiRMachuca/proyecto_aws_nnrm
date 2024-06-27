
const AWS = require('aws-sdk');
const s3 = new AWS.S3();



exports.handler = async (event) => {
    const bucketName = process.env.BUCKET_NAME;
    const key = process.env.ARCHIVO_NAME;
    const tableName = process.env.TABLE_NAME;

    // Recuperar el archivo JSON de S3
    const params = {
        Bucket: bucketName,
        Key: key
    };

    try {
        const data = await s3.getObject(params).promise();
        const jsonData = JSON.parse(data.Body.toString('utf-8'));

        // Insertar los datos en DynamoDB
        const insertParams = {
            TableName: tableName,
            Item: jsonData
        };

        await dynamodb.put(insertParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Datos insertados correctamente en DynamoDB' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};