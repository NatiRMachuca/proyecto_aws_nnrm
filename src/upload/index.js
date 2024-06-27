const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
AWS.config.update({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey:  process.env.ACCESS_SECRET,
    region: process.env.REGION,
});

const s3 = new AWS.S3();

const subirArchivo = (filePath, bucketName, key) => {
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: 'application/json'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error subiendo el archivo', err);
        } else {
            console.log(`Archivo subido exitosamente: ${data.Location}`);
        }
    });
};


const bucketName = process.env.BUCKET_NAME;
const key = process.env.ARCHIVO_NAME;
const filePath = path.join(__dirname, key);

subirArchivo(filePath, bucketName, key);