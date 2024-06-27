const AWS = require('aws-sdk');
require('dotenv').config();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
    let idBuscar="";
    let response={statusCode: 200}

    const { httpMethod, pathParameters,body} = event;
    if(pathParameters.id!=undefined && pathParameters.id!=null ) idBuscar=pathParameters.id

    console.log("TABLE_NAME",TABLE_NAME,"idBuscar",idBuscar,"pathParameters",pathParameters);
    
    const updateExpression = [];
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    for (const key in body) {
        updateExpression.push(`#${key} = :${key}`);
        ExpressionAttributeNames[`#${key}`] = key;
        ExpressionAttributeValues[`:${key}`] = body[key];
    }

    console.log("body: ",body,"ExpressionAttributeNames: ",ExpressionAttributeNames);
    const params = {
        TableName: TABLE_NAME,
        Key: { id: idBuscar},
        UpdateExpression: `set ${updateExpression.join(', ')}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW'
    };

    try {
        const data = await dynamodb.update(params).promise();
        response= { status: 'success', data: data.Attributes };
    } catch (err) {
        response= { status: 'error', message: err.message };
    }
      
   
    console.log(response);
    return response;
};