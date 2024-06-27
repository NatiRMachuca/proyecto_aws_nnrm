const AWS = require('aws-sdk');
require('dotenv').config();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
    let idBuscar="";
    let response={statusCode: 200}
    
    const { pathParameters } = event;
    console.log(pathParameters);
    if(pathParameters.idTransfer!=undefined && pathParameters.idTransfer!=null ) idBuscar=pathParameters.idTransfer

    console.log("TABLE_NAME",TABLE_NAME,"idBuscar",idBuscar,"pathParameters",pathParameters);
    
    console.log(response);
    return response;
};