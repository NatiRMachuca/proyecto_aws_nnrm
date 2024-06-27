const AWS = require('aws-sdk');
//require('dotenv').config();
AWS.config.update({region: process.env.AWS_DEFAULT_REGION});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;


const readItems = async () => {
    let items=[];
    console.log("table", TABLE_NAME)
    const params = {
        TableName: TABLE_NAME
    };

    

    try {
        let data;
        do {
            data = await dynamodb.scan(params).promise();
            items = items.concat(data.Items);
            params.ExclusiveStartKey = data.LastEvaluatedKey;
        } while (typeof data.LastEvaluatedKey !== 'undefined');

        return { status: 'success', data:items };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
};

exports.handler = async (event) => {
    const { httpMethod } = event;
    let response = await readItems();
    
    console.log(response);

    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json'
        }
    };
};