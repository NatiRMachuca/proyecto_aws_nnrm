const AWS = require('aws-sdk');
require('dotenv').config();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
    let idBuscar="";
    let response={statusCode: 200}

    const { httpMethod, pathParameters } = event;
    if(pathParameters.id!=undefined && pathParameters.id!=null ) idBuscar=pathParameters.id

    console.log("TABLE_NAME",TABLE_NAME,"idBuscar",idBuscar,"pathParameters",pathParameters);
    const params = {
        TableName: TABLE_NAME,
        Key: { id: idBuscar}
    };

    try {
        const data = await dynamodb.get(params).promise();
        if (data.Item) {
            response= {
                statusCode: 200,
                body: JSON.stringify(data.Item),
                headers: { 'Content-Type': 'application/json' }
            };
        } else {
            response= {
                statusCode: 404,
                body: JSON.stringify({ message: 'Item not found' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }
    } catch (err) {
        response= {
            statusCode: 500,
            body: JSON.stringify({ message: "Ocurrio un error" }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
    console.log(response);
    return response;
};