const AWS = require('aws-sdk');
require('dotenv').config();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
    let idBuscar="";
    let response={statusCode: 200}

    const { httpMethod, pathParameters } = event;
    if(pathParameters.idTransfer!=undefined && pathParameters.idTransfer!=null ) idBuscar=pathParameters.idTransfer

    console.log("TABLE_NAME",TABLE_NAME,"idBuscar",idBuscar,"pathParameters",pathParameters);
    const params = {
        TableName: TABLE_NAME,
        Key: { id: idBuscar}
    };
    
    try {
        await dynamodb.delete(params).promise();
        response= { status: 'success', message: 'Item deleted successfully' };
    } catch (err) {
        response= { status: 'error', message: err.message };
    }
   
    console.log(response);
    return response;
};