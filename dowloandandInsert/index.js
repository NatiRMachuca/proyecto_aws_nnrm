
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TABLE_NAME = process.env.TABLE_NAME;
AWS.config.update({
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey:  process.env.ACCESS_SECRET,
    region: process.env.REGION,
});

const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

const descargarArchivo = (bucketName, key, downloadPath) => {
    const params = {
        Bucket: bucketName,
        Key: key
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            console.error('Error descargando el archivo', err);
        } else {
            fs.writeFileSync(downloadPath, data.Body.toString());
            console.log(`Archivo descargado exitosamente a ${downloadPath}`);
            insertarDatos(downloadPath);
        }
    });
};

const insertarDatos = (filePath) => {
    const fileContent = fs.readFileSync(filePath);
    const jsonData = JSON.parse(fileContent);
    console.log(jsonData);
    jsonData.forEach(item => {
        const params = {
            TableName: TABLE_NAME,
            Item: {
                id: item.id,
                validated: item.validated,
                inUse: item.inUse,
                monto:  item.monto,
                tipo: item.tipo,
                fechaMovimiento: item.fechaMovimiento,
                fecha: item.fecha,
                originName: item.originName,
                originRut: item.originRut,
                originAccount: item.originAccount,
                receiverRut: item.receiverRut,
                receiverAccount: item.receiverAccount,
                originBankCode: item.originBankCode,
                originBankName: item.originBankName,
                comment: item.comment,
                originAccountType: item.originAccountType,
                validatedAt: item.validatedAt,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
        }
 
        dynamodb.put(params, (err, data) => {
            if (err) {
                console.error('Error insertando datos en DynamoDB', err);
            } else {
                console.log('Datos insertados:', data);
            }
        });
    });
};

const bucketName = process.env.BUCKET_NAME;
const key = process.env.ARCHIVO_NAME;
const downloadPath = path.join(__dirname, '.'+key);

descargarArchivo(bucketName, key, downloadPath);