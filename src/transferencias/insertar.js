const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({region: process.env.AWS_DEFAULT_REGION});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;


const createItem = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };

    try {
        await dynamodb.put(params).promise();
        return { status: 'success', message: 'Item created successfully' };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
};


exports.handler = async (event) => {
    const { httpMethod, pathParameters, body } = event;
    console.log(event);
    const item = JSON.parse(body);
    item.id = item.id || Date.now().toString();
    let response = await createItem(item);
            
    console.log(JSON.stringify(response));
    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};